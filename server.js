const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const productsRouter = require('./routers/product.router');
const categoriesRouter = require('./routers/categories.router');
const usersRouter = require('./routers/user.router');
require('dotenv').config();
const cors = require("cors");
const axios = require('axios');

// اتصال قاعدة البيانات
connectDB();

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));  // Front End
app.use(express.static(path.join(__dirname, '/dashboard/build')));   // Admin Panel


// Middleware
app.use(express.json());
app.use(cors());



// المسارات
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use("/api/users" , usersRouter);

app.get('*', (req, res) => {
  // التأكد من أن المسار يبدأ بـ /admin أو / (أو أي شيء يناسب هيكل التطبيق لديك)
  if (req.url.startsWith('/dashboard')) {
    res.sendFile(path.join(__dirname, '/dashboard/build', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
  }
});

app.post('/api/translate', async (req, res) => {
    try {
      const { text, targetLang } = req.body;
      console.log(req.body)
  
      if (!text || !targetLang) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
      
      const response = await axios.post('https://libretranslate.de/translate', {
        q: text,
        source: 'en',
        target: targetLang,
      });
  
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error occurred while translating', );
    }
  });
  

// تشغيل الخادم
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT}`));
