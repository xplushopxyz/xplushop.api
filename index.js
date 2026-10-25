const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    name: "XPLUSHOP API",
    status: "Secure backend",
    version: "1.0.0"
  });
});

app.get('/api/v1/games', (req, res) => {
  res.json([
    { id: "mlbb", name: "Game A" },
    { id: "pubgm", name: "Game B" },
    { id: "ff", name: "Game C" }
  ]);
});

app.post('/api/v1/orders', (req, res) => {
  const { game, userId, amount } = req.body;
  res.json({ success: true, orderId: "XPL" + Date.now(), game, userId, amount });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API running on http://localhost:' + PORT));

app.get('/api/v1/stats', (req,res)=>{
  res.json({ users: 42000, uptime: process.uptime(), version: "1.1.0" });
});
// Day1 - Payment bill
app.post('/api/v1/payments/create-bill', (req,res)=>{ res.json({ billCode: 'BILL'+Date.now(), status: 'pending' }); });
// Day2 - MLBB topup
app.post('/api/v1/topup/mlbb', (req,res)=>{ res.json({ success:true, trxId: 'SMILE'+Date.now() }); });
