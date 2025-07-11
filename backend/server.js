// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/connect');
const contactRoutes = require('./Routes/contactroutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/contacts', contactRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
