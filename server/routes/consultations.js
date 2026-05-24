const express = require('express')
const pool = require('../db')
const jwt = require('jsonwebtoken')

const router = express.Router()

function requireAdmin(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Chưa đăng nhập.' })
  }
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET)
    req.userId = payload.userId
    req.isAdmin = payload.isAdmin
    if (!payload.isAdmin) return res.status(403).json({ message: 'Không có quyền truy cập.' })
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ.' })
  }
}

// 1. POST /api/consultations — Create a request (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, notes } = req.body

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' })
    }

    const result = await pool.query(
      `INSERT INTO consultations (name, email, phone, notes, status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING *`,
      [name, email, phone, notes || null]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('POST /api/consultations error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// 2. GET /api/consultations — Get all requests (Admin Only)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20))
    const offset = (page - 1) * limit
    const { status } = req.query

    const conditions = status ? ['status = $3'] : []
    const params = status ? [limit, offset, status] : [limit, offset]
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const [rows, countRes] = await Promise.all([
      pool.query(
        `SELECT id, name, email, phone, status, notes, created_at
         FROM consultations
         ${where}
         ORDER BY created_at DESC
         LIMIT $1 OFFSET $2`,
        params
      ),
      pool.query(
        `SELECT COUNT(*) FROM consultations ${where}`,
        status ? [status] : []
      ),
    ])

    res.json({
      consultations: rows.rows,
      total: Number(countRes.rows[0].count),
      page,
      limit,
    })
  } catch (err) {
    console.error('GET /api/consultations error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// 3. GET /api/consultations/:id — Get a request by ID (Admin Only)
router.get('/:id', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, status, notes, created_at FROM consultations WHERE id = $1',
      [req.params.id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu tư vấn.' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('GET /api/consultations/:id error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// 4. PATCH /api/consultations/:id/status — Update request status (Admin Only)
router.patch('/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body
    const allowed = ['pending', 'completed']
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ.' })
    }

    const result = await pool.query(
      'UPDATE consultations SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu tư vấn.' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error('PATCH /api/consultations/:id/status error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
