import { createApp } from '../dist/main'; // Убедитесь, что этот путь правильный
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: any, res: any) {
  const server = await createApp();
  server(req, res); // Пробрасываем запрос в Express сервер
}
