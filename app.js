import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { limitMiddleware } from './middleware/limit.js';
import { saveUserToMailService } from './services/add-contact.js';
import { sendMailToUser } from './services/send-mail.js';

const app = express();
app.use(express.json())

app.post('/create-user', (req, res) => {
  const { email, nameSurname } = req.body;
  saveUserToMailService(nameSurname, email, 'allUser');
  sendMailToUser(nameSurname, email, 'welcome');
  res.json({ message: 'created user' });
});

app.post('/subscribe', (req, res) => {
  const { email, nameSurname } = req.body;
  saveUserToMailService(nameSurname, email, 'premiumUser');
  sendMailToUser(nameSurname, email, 'became_premium');
  res.json({ message: 'subscribed' });
});

app.post('/unsubscribe', (req, res) => {
  const { email, nameSurname } = req.body;
  saveUserToMailService(nameSurname, email, 'deactivatedPremiumUser');
  sendMailToUser(nameSurname, email, 'deactivated_premium');
  res.json({ message: 'unsubscribed' });
});

app.post('/limited-data', limitMiddleware, (req, res) => {
  res.json({ message: 'limited data' });
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
