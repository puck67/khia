const express = require('express')
const jwt = require('jsonwebtoken')
const pool = require('../db')

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
  } catch {
    return res.status(401).json({ message: 'Token không hợp lệ.' })
  }
}

// GET /api/admin/stats
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const [usersRes, bookingsRes, revenueRes, pendingRes] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM users WHERE is_admin = FALSE'),
      pool.query('SELECT COUNT(*) FROM bookings'),
      pool.query("SELECT COALESCE(SUM(price_vnd),0) FROM bookings WHERE status = 'confirmed'"),
      pool.query("SELECT COUNT(*) FROM bookings WHERE status = 'pending'"),
    ])
    res.json({
      totalUsers: Number(usersRes.rows[0].count),
      totalBookings: Number(bookingsRes.rows[0].count),
      totalRevenue: Number(revenueRes.rows[0].coalesce),
      pendingBookings: Number(pendingRes.rows[0].count),
    })
  } catch (err) {
    console.error('GET /api/admin/stats error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/admin/bookings?page=1&limit=20&status=pending
router.get('/bookings', requireAdmin, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20))
    const offset = (page - 1) * limit
    const { status } = req.query

    const conditions = status ? ['b.status = $3'] : []
    const params = status ? [limit, offset, status] : [limit, offset]
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const [rows, countRes] = await Promise.all([
      pool.query(
        `SELECT b.id, b.name, b.phone, b.email, b.service, b.pkg,
                b.booking_date, b.booking_slot, b.payment_method,
                b.price_vnd, b.status, b.created_at, b.notes, b.location
         FROM bookings b
         ${where}
         ORDER BY b.created_at DESC
         LIMIT $1 OFFSET $2`,
        params
      ),
      pool.query(
        `SELECT COUNT(*) FROM bookings b ${where}`,
        status ? [status] : []
      ),
    ])

    res.json({
      bookings: rows.rows,
      total: Number(countRes.rows[0].count),
      page,
      limit,
    })
  } catch (err) {
    console.error('GET /api/admin/bookings error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PATCH /api/admin/bookings/:id/status
router.patch('/bookings/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body
    const allowed = ['pending', 'confirmed', 'cancelled', 'completed']
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Trạng thái không hợp lệ.' })

    const result = await pool.query(
      'UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy booking.' })
    res.json(result.rows[0])
  } catch (err) {
    console.error('PATCH /api/admin/bookings/:id/status error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/admin/users?page=1&limit=20
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20))
    const offset = (page - 1) * limit

    const [rows, countRes] = await Promise.all([
      pool.query(
        `SELECT id, first_name, last_name, email, phone, role, is_admin, created_at
         FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query('SELECT COUNT(*) FROM users'),
    ])

    res.json({
      users: rows.rows.map((u) => ({
        id: u.id,
        firstName: u.first_name,
        lastName: u.last_name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        isAdmin: u.is_admin,
        createdAt: u.created_at,
      })),
      total: Number(countRes.rows[0].count),
      page,
      limit,
    })
  } catch (err) {
    console.error('GET /api/admin/users error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/admin/services — list all categories with price
router.get('/services', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sc.id, sp.slug, sp.title AS package_title, sc.name, sc.description, sc.price_vnd, sc.sort_order
       FROM service_categories sc
       JOIN service_packages sp ON sp.id = sc.package_id
       ORDER BY sp.sort_order, sc.sort_order`
    )
    res.json(result.rows)
  } catch (err) {
    console.error('GET /api/admin/services error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PATCH /api/admin/services/:id — update price
router.patch('/services/:id', requireAdmin, async (req, res) => {
  try {
    const { price_vnd } = req.body
    const result = await pool.query(
      'UPDATE service_categories SET price_vnd=$1 WHERE id=$2 RETURNING *',
      [price_vnd ?? null, req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy.' })
    res.json(result.rows[0])
  } catch (err) {
    console.error('PATCH /api/admin/services/:id error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
