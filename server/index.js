require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const servicesRoutes = require('./routes/services')
const adminRoutes = require('./routes/admin')
const bookingsRoutes = require('./routes/bookings')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: /^http:\/\/localhost:\d+$/, credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/bookings', bookingsRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
