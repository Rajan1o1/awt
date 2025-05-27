const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/quotes', async (req, res) => {
  const quotes = await prisma.quote.findMany();
  res.json(quotes);
});

app.post('/api/quotes', async (req, res) => {
  const { text, author } = req.body;
  const newQuote = await prisma.quote.create({
    data: { text, author }
  });
  res.json(newQuote);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
