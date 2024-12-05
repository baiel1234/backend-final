import { createApp } from '../dist/main'; // Убедитесь, что этот путь правильный
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const app = await createApp();
    app(req, res); // Передаём запросы в ваше приложение
  } catch (error) {
    console.error('Error initializing the app:', error);
    res.status(500).send('Internal Server Error i');
  }
}