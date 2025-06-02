import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import prisma from '../config/database';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'SportTracker API is running',
    timestamp: new Date().toISOString(),
  });
});

router.get('/db', asyncHandler(async (req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({
    status: 'ok',
    message: 'Database connection is healthy',
    timestamp: new Date().toISOString(),
  });
}));

export default router;
