import { z } from 'zod';

const OBJECT_ID_REGEX = /^[\dA-Fa-f]{24}$/;

export const ObjectIdZodSchema = z
  .string()
  .refine((value) => value.match(OBJECT_ID_REGEX), {
    message: `must be a valid ObjectId`,
  });
