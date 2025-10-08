import { Router, Request, Response } from 'express';
import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

const router = Router();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN as string;
const CHAT_ID = process.env.CHAT_ID as string;

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Bitte alle Felder ausfüllen' });
    return;
  }

  const text = `
📩 Neue Nachricht von der Webseite:
👤 Name: ${name}
📧 Email: ${email}
💬 Nachricht: ${message}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
    });

    console.log('Received contact request:', req.body);
    res.json({ success: true });
  } catch (err) {
    console.error('Telegram API Error:', err);
    res.status(500).json({ error: 'Fehler beim Senden an Telegram' });
  }
});

export default router;
