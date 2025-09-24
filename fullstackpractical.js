const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let cards = [
  { id: 1, suit: 'Hearts', value: 'Ace' },
  { id: 2, suit: 'Spades', value: 'King' },
  { id: 3, suit: 'Diamonds', value: 'Queen' },
];

app.get('/cards', (req, res) => {
  res.json(cards);
});

app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send('Card not found');
  res.json(card);
});

app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) {
    return res.status(400).send('Suit and value are required');
  }
  const newCard = {
    id: cards.length + 1,
    suit,
    value,
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.delete('/cards/:id', (req, res) => {
  const cardIndex = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (cardIndex === -1) return res.status(404).send('Card not found');
  cards.splice(cardIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
