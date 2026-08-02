const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const habitRoutes = require('./routes/habitRoutes');

require('dotenv').config();

const app = express();



// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/habits', habitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur Nudge démarré sur le port ${PORT}`));