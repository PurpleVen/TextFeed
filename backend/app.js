const express = require('express');
const cors = require('cors');
const allowedOrigins = ['https://text-feed.vercel.app', 'http://localhost:3000'];
// const allowedOrigins = ['http://localhost:3000'];
const bodyParser = require('body-parser');
require('dotenv').config({ path: './.env' });
console.log(process.env.MONGO_URI);
const mongoose = require('mongoose');
const firebaseAdmin = require('firebase-admin');
const postsRoutes = require('./routes/posts');

const decodedKey = Buffer.from(process.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY_BASE64, 'base64').toString('utf8');
const serviceAccount = JSON.parse(decodedKey);

// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.error('error mongodb:', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

//firebase auth
const verifyIdToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(' ')[1];
  if (!idToken) return res.status(401).send('unauthorized');

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send('unauthorized');
  }
};

app.get('/', (req, res) => {
  res.send('backend is live');
}); //root

app.use('/api/posts', verifyIdToken, postsRoutes);

//start server
app.listen(5000, () => {
  console.log('server is running on port 5000');
});
