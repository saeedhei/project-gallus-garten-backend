// src\modules\admin\dashboard\users.routes.ts
import express, { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import { projectRoot } from '../../../core/config/root.js';

const usersFilePath = path.join(projectRoot, 'src/users.json');
console.log('Root: ' + projectRoot);
console.log('users: ' + usersFilePath);

const router: Router = express.Router();

// GET all users
router.get('/', (req: Request, res: Response): void => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  res.json(users);
});

// POST add activity
router.post('/:id/add-activity', (req: Request, res: Response): void => {
  const userId = parseInt(req.params.id, 10);
  const newActivity = req.body;

  // Eingabedaten validieren
  if (
    !newActivity ||
    typeof newActivity.date !== 'string' ||
    typeof newActivity.startTime !== 'string' ||
    typeof newActivity.endTime !== 'string' ||
    typeof newActivity.activityType !== 'string'
  ) {
    res.status(400).json({ message: 'Ungültige Aktivitätsdaten' });
    return;
  }

  try {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const userIndex = users.findIndex((user: any) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).json({ message: 'Benutzer nicht gefunden' });
      return;
    }

    users[userIndex].activities2025 = users[userIndex].activities2025 || [];
    users[userIndex].activities2025.push(newActivity);

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');

    res.status(200).json({ message: 'Aktivität erfolgreich hinzugefügt', user: users[userIndex] });
  } catch (error) {
    console.error('Fehler beim Schreiben:', error);
    res.status(500).json({ message: 'Interner Serverfehler', error });
  }
});

export default router;
