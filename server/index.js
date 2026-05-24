require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pool = require('./db')
const authRoutes = require('./routes/auth')
const servicesRoutes = require('./routes/services')
const adminRoutes = require('./routes/admin')
const bookingsRoutes = require('./routes/bookings')
const consultationsRoutes = require('./routes/consultations')

// Create consultations table on startup
pool.query(`
  CREATE TABLE IF NOT EXISTS consultations (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    phone      VARCHAR(50)  NOT NULL,
    status     VARCHAR(50)  NOT NULL DEFAULT 'pending',
    notes      TEXT,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
  );
`).catch(err => console.error('Failed to create consultations table:', err))

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: [/^http:\/\/localhost:\d+$/, /\.vercel\.app$/, /\.railway\.app$/],
  credentials: true,
}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/bookings', bookingsRoutes)
app.use('/api/consultations', consultationsRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
