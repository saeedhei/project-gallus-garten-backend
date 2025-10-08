// src/routes/ai.ts
import { fileURLToPath } from 'url';
import path from 'path';
import { Router, Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const DATA_FILE = path.join(__dirname, '../../daily-ai.json');

function readHistory(): any[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeHistory(history: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(history, null, 2), 'utf-8');
}

// 🧠 Anfrage an OpenRouter statt OpenAI
async function askAI(prompt: string): Promise<string> {
  const res = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'gpt-4o-mini', // oder 'mistralai/mistral-7b-instruct' falls bevorzugt
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://api.gallusgarten.de',
        'X-Title': 'Gallus Garten KI Sektion',
      },
    },
  );

  if (!res.data?.choices?.[0]?.message?.content) {
    throw new Error('Keine Antwort von OpenRouter erhalten');
  }

  return res.data.choices[0].message.content.trim();
}

// 🌿 KI-generierte tägliche Nachricht
async function generateDailyMessage() {
  const history = readHistory();
  const usedPlants = history.map((h) => h.plant);
  const today = new Date().toLocaleDateString('de-DE');

  const plantPrompt = `
Hier ist eine Liste von Pflanzen, über die du bereits gesprochen hast: ${usedPlants.join(', ')}.
Schlage bitte eine neue Pflanze oder einen Baum vor, die/den du bisher nicht erwähnt hast.
Gib nur den Namen zurück, ohne Beschreibung.
`;

  const newPlant = await askAI(plantPrompt);

  const infoPrompt = `Heute (${today}) schreibe eine kurze, inspirierende Nachricht über ${newPlant}.`;
  const message = await askAI(infoPrompt);

  const entry = { date: today, plant: newPlant, message };
  history.push(entry);
  writeHistory(history);

  console.log('✅ Neue tägliche Nachricht generiert:', entry);
  return entry;
}

// ⏰ Jeden Tag um 8 Uhr automatisch
cron.schedule('0 8 * * *', async () => {
  try {
    await generateDailyMessage();
  } catch (err) {
    console.error('❌ Fehler beim täglichen Generieren:', err);
  }
});

// 📤 Letzte Nachricht abrufen
router.get('/latest', (req: Request, res: Response): void => {
  const history = readHistory();
  if (history.length === 0) {
    res.status(404).json({ error: 'Es wurde noch keine Nachricht generiert.' });
  } else {
    res.json(history[history.length - 1]);
  }
});

// 📚 Gesamte Historie
router.get('/history', (req, res) => {
  res.json(readHistory());
});

// 🧪 Manuelles Generieren (Test)
router.get('/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await generateDailyMessage();
    res.json(result);
  } catch (err: any) {
    console.error('❌ Fehler beim manuellen Generieren:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Fehler beim manuellen Generieren der Nachricht',
      details: err.response?.data || err.message,
    });
  }
});

export default router;
