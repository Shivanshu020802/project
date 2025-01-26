import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import productsRouter from './routes/products.js';
import { errorHandler } from './middleware/errorHandler.js';
import { setupLogging } from './middleware/logging.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(helmet());
app.use(express.json());
setupLogging(app);

// Routes
app.use('/api/products', productsRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; 