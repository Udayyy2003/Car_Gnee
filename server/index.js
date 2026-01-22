import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Note: In a real app, these would be in separate files
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Received contact request:', { name, email, phone, message });
  // Since we are using localStorage on the frontend as per requirements, 
  // this backend serves as a placeholder for future DB integration.
  res.status(200).json({ success: true, message: 'Contact request received' });
});

app.post('/api/booking', (req, res) => {
  const { name, phone, email, carType, planType, address } = req.body;
  console.log('Received booking request:', { name, phone, email, carType, planType, address });
  res.status(200).json({ success: true, message: 'Booking request received' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
