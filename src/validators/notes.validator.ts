import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class NotesValidator {
  // Validation schema for creating a note
  public createNoteSchema = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      color: Joi.string().optional(),
      isArchive: Joi.boolean().default(false),
      isTrash: Joi.boolean().default(false),
      createdBy: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

  // Validation schema for updating a note
  public updateNoteSchema = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      color: Joi.string().optional(),
      isArchive: Joi.boolean().optional(),
      isTrash: Joi.boolean().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
}

export default NotesValidator;
