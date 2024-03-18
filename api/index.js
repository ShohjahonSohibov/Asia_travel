require('dotenv').config()
const express = require('express')
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('../config/db');
const hotelRoutes = require("../routes/hotelRoutes")
const bannerRoutes = require("../routes/bannerRoutes")
const destinationRoutes = require("../routes/destinationRoutes")
const reviewsRoutes = require("../routes/reviewsRoutes")
const roomsRoutes = require("../routes/roomsRoutes")
const tourProgramRoutes = require("../routes/tourProgramRoutes")
const tourRoutes = require("../routes/tourRoutes")

connectDB();
const app = express();

app.set('trust proxy', 1);

app.use(express.json({ limit: '4mb' }));
app.use(helmet());
app.use(cors());

//root route
app.get('/', (req, res) => {
  res.send('App works properly!');
});

//this for route will need for store front, also for admin dashboard
app.use('/api/v1/hotel/', hotelRoutes);
app.use('/api/v1/banner/', bannerRoutes);
app.use('/api/v1/destination/', destinationRoutes);
app.use('/api/v1/review/', reviewsRoutes);
app.use('/api/v1/room/', roomsRoutes);
app.use('/api/v1/tour-program/', tourProgramRoutes);
app.use('/api/v1/tour/', tourRoutes);

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ message: err.message });
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
