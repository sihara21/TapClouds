
// backend/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Env variables
const PORT = process.env.PORT || 3000;
const WORLD_ID_APP_ID = process.env.WORLD_ID_APP_ID;
const WORLD_ID_ACTION_ID = process.env.WORLD_ID_ACTION_ID;
const SECRET_KEY = process.env.SECRET_KEY;

// Dummy endpoint (replace with actual World ID verification logic)
app.post('/verify-world-id', (req, res) => {
  const { nullifier_hash, merkle_root, proof, credential_type } = req.body;

  if (nullifier_hash && merkle_root && proof && credential_type) {
    // Normally verify proof here with World ID API or zk verifier
    console.log("World ID verification payload:", req.body);
    res.json({ success: true, message: 'World ID verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Missing fields in request' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
