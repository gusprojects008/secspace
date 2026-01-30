require('dotenv').config();
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import authRoutes from './routes/auth';
import commentsRoutes from './routes/comments';
import authJwt from './middlewares/authJwt';
import PORT = process.env.PORT;
import app = express();

app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUnintialized: false,
  cookie: {secure: false}
}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/comments', authJwt, commentsRoutes); 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running: ${PORT}`);
});
