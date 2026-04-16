import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import connectDB from './utils/db.js';
import authRouter from './routes/auth.routes.js';
import adminRouter from './routes/admin.routes.js';
import errorHandler from './middlewares/error.middleware.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security: Helmet for security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Logging (development only)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS setup
const CLIENT_ORIGINS = [
  'http://localhost:5173',
  'https://alumni-client.vercel.app'
];
app.use(cors({ origin: CLIENT_ORIGINS, methods: ['GET','POST','PUT','PATCH','DELETE'], credentials: true }));
app.options('*', cors({ origin: CLIENT_ORIGINS, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/admin/public', express.static(path.join(process.cwd(), 'Public')));

app.use('/auth', authRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => res.send('Hello from Alumni Server!'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route Not Found' });
});

// Central error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
