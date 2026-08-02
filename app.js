const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const habitRoutes = require('./routes/habitRoutes');

const app = express();

// Connexion BDD
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/habits', habitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur Nudge démarré sur le port ${PORT}`));