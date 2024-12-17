import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Create a new transaction
router.post('/', async (req, res) => {
  const { walletId, type, amount, category } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: { walletId, type, amount, category },
    });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create transaction' });
  }
});

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await prisma.transaction.findMany();
  res.json(transactions);
});

// Get a specific transaction
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// Update a transaction
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { type, amount, category } = req.body;
  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: { type, amount, category },
    });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update transaction' });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.transaction.delete({ where: { id } });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete transaction' });
  }
});

export default router;

