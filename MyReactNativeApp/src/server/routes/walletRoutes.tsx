import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Create a new wallet
router.post('/', async (req, res) => {
  const { userId, balance } = req.body;
  try {
    const wallet = await prisma.wallet.create({
      data: { userId, balance },
    });
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create wallet' });
  }
});

// Get all wallets
router.get('/', async (req, res) => {
  const wallets = await prisma.wallet.findMany();
  res.json(wallets);
});

// Get a specific wallet
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const wallet = await prisma.wallet.findUnique({ where: { id } });
  if (wallet) {
    res.json(wallet);
  } else {
    res.status(404).json({ error: 'Wallet not found' });
  }
});

// Update a wallet
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;
  try {
    const wallet = await prisma.wallet.update({
      where: { id },
      data: { balance },
    });
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update wallet' });
  }
});

// Delete a wallet
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.wallet.delete({ where: { id } });
    res.json({ message: 'Wallet deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete wallet' });
  }
});

export default router;

