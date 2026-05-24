const express = require('express')
const pool = require('../db')
const jwt = require('jsonwebtoken')

const router = express.Router()

function optionalAuth(req, res, next) {
  const header = req.headers.authorization
  if (header && header.startsWith('Bearer ')) {
    try {
      const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET)
      req.userId = payload.userId
    } catch {}
  }
  next()
}

// POST /api/bookings
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { name, phone, email, service, pkg, location, notes, date, slot, paymentMethod } = req.body

    if (!name || !phone || !email) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' })
    }

    // Lookup price
    let price_vnd = null
    if (service && pkg) {
      const priceRes = await pool.query(
        `SELECT sc.price_vnd FROM service_categories sc
         JOIN service_packages sp ON sp.id = sc.package_id
         WHERE sc.name = $1`,
        [pkg]
      )
      if (priceRes.rows.length > 0) price_vnd = priceRes.rows[0].price_vnd
    }

    const result = await pool.query(
      `INSERT INTO bookings (user_id, name, phone, email, service, pkg, location, notes, booking_date, booking_slot, payment_method, price_vnd, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'pending')
       RETURNING id`,
      [req.userId || null, name, phone, email, service || null, pkg || null, location || null, notes || null, date || null, slot || null, paymentMethod || null, price_vnd]
    )

    const bookingId = result.rows[0].id
    const code = `#PTV-${bookingId.toString(36).toUpperCase().padStart(6, '0')}`

    res.status(201).json({ id: bookingId, code })
  } catch (err) {
    console.error('POST /api/bookings error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
