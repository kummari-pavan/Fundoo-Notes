// middleware/redisMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../config/redisClient';

export const cacheNoteById = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.params;
  const userId = res.locals.user;

  try {
    const cacheData = await redisClient.get(`user_${userId}_note_${noteId}`);
    if (cacheData) {
      return res.status(200).json({
        code: 200,
        data: JSON.parse(cacheData),
        message: 'Note fetched from cache',
      });
    }
    next();
  } catch (error) {
    console.error('Cache Error:', error);
    next();
  }
};

export const cacheAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.user;

  try {
    const cacheData = await redisClient.get(`user_notes_${userId}`);
    if (cacheData) {
      return res.status(200).json({
        code: 200,
        data: JSON.parse(cacheData),
        message: 'Notes fetched from cache',
      });
    }
    next();
  } catch (error) {
    console.error('Cache Error:', error);
    next();
  }
};
