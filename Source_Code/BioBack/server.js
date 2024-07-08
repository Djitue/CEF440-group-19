// server.js
const express = require('express');
const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var admin = require("firebase-admin");

var serviceAccount = require("./biometric-fingerprint-data-firebase-adminsdk-m17fg-3e53abba92.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const app = express();
app.use(bodyParser.json());

const JWT_SECRET = 'your_jwt_secret_key'; // Use a secure key in production

// Registration Route (same as previous)
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRecord = await admin.auth().createUser({
      email,
      password: hashedPassword,
    });

    await db.collection('users').doc(userRecord.uid).set({
      email,
      role,
    });

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Retrieve user record from Firestore
    const userSnapshot = await db.collection('users').where('email', '==', email).where('role', '==', role).get();
    if (userSnapshot.empty) {
      return res.status(400).send({ error: 'Invalid credentials or role' });
    }

    const userDoc = userSnapshot.docs[0];
    const userId = userDoc.id;
    const userData = userDoc.data();

    // Verify password
    const userRecord = await admin.auth().getUser(userId);
    const isPasswordValid = await bcrypt.compare(password, userRecord.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ uid: userId, role: userData.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
