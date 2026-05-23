const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db')

const router = express.Router()

// Middleware: verify JWT
function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Chưa đăng nhập.' })
  }
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET)
    req.userId = payload.userId
    next()
  } catch {
    return res.status(401).json({ message: 'Token không hợp lệ.' })
  }
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body

  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin bắt buộc.' })
  }

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email đã được sử dụng.' })
    }

    const hash = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, phone, password_hash, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, first_name, last_name, email, phone, role, created_at`,
      [firstName, lastName, email, phone, hash, role || 'ca-nhan']
    )

    const user = result.rows[0]
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return res.status(201).json({
      message: 'Đăng ký thành công.',
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json({ message: 'Lỗi server. Vui lòng thử lại.' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' })
  }

  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, phone, role, password_hash FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' })
    }

    const user = result.rows[0]
    const valid = await bcrypt.compare(password, user.password_hash)

    if (!valid) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return res.json({
      message: 'Đăng nhập thành công.',
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Lỗi server. Vui lòng thử lại.' })
  }
})

// GET /api/auth/profile
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, phone, role, created_at FROM users WHERE id = $1',
      [req.userId]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' })
    }
    const u = result.rows[0]
    return res.json({
      id: u.id,
      firstName: u.first_name,
      lastName: u.last_name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      createdAt: u.created_at,
    })
  } catch (err) {
    console.error('Profile error:', err)
    return res.status(500).json({ message: 'Lỗi server.' })
  }
})

// PUT /api/auth/profile
router.put('/profile', requireAuth, async (req, res) => {
  const { firstName, lastName, phone, role } = req.body

  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' })
  }

  try {
    const result = await pool.query(
      `UPDATE users SET first_name=$1, last_name=$2, phone=$3, role=$4
       WHERE id=$5
       RETURNING id, first_name, last_name, email, phone, role, created_at`,
      [firstName, lastName, phone, role, req.userId]
    )
    const u = result.rows[0]
    return res.json({
      message: 'Cập nhật thành công.',
      user: {
        id: u.id,
        firstName: u.first_name,
        lastName: u.last_name,
        email: u.email,
        phone: u.phone,
        role: u.role,
      },
    })
  } catch (err) {
    console.error('Update profile error:', err)
    return res.status(500).json({ message: 'Lỗi server.' })
  }
})

// PUT /api/auth/password
router.put('/password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ.' })
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu mới phải ít nhất 6 ký tự.' })
  }

  try {
    const result = await pool.query('SELECT password_hash FROM users WHERE id=$1', [req.userId])
    const valid = await bcrypt.compare(currentPassword, result.rows[0].password_hash)
    if (!valid) {
      return res.status(401).json({ message: 'Mật khẩu hiện tại không đúng.' })
    }
    const hash = await bcrypt.hash(newPassword, 10)
    await pool.query('UPDATE users SET password_hash=$1 WHERE id=$2', [hash, req.userId])
    return res.json({ message: 'Đổi mật khẩu thành công.' })
  } catch (err) {
    console.error('Change password error:', err)
    return res.status(500).json({ message: 'Lỗi server.' })
  }
})

module.exports = router

