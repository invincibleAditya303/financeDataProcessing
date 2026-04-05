const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const recordRoutes = require('./routes/recordRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const roleRequestRoutes = require('./routes/roleRequestRoutes')

const app = express()
app.use(express.json())
app.use(cors())

require('dotenv').config()

const PORT = process.env.PORT || 5000

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/records', recordRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/role', roleRequestRoutes)

app.post("/api/auth/test", (req, res) => {
  console.log("Test route hit");
  res.send("OK");
});

// Listening to the PORT
app.listen(PORT, () => {
    console.log('Server running on http://localhost:5000')
})