import { Schema, model } from 'mongoose';
import { Log, LOG_LEVEL, LogMetadata, LogSource, SOURCE_TYPE } from './types/log.type';

export const COLLECTION_NAME = 'logs';

const LOG_METADATA = new Schema<LogMetadata>({
  key: { type: String, required: true },
  value: { type: String, required: true },
}, {
  _id: false,
  versionKey: false,
})

const LOG_SOURCE_SCHEMA = new Schema<LogSource>({
  type: { type: String, required: true, enum: SOURCE_TYPE },
  entity: { type: String, required: true },
  entityInstance: { type: String, required: true },
}, {
  _id: false,
  versionKey: false,
})

export const LOG_SCHEMA = new Schema<Log>({
  id: { type: String, required: false },
  message: String,
  level: { type: String, required: true, enum: LOG_LEVEL },
  timestamp: { type: Date, required: true },
  source: { type: LOG_SOURCE_SCHEMA, required: true },
  metadata: [LOG_METADATA],
}, {
  versionKey: false,
});

LOG_SCHEMA.index({
  timestamp: 1,
  'source.entity': 1,
  level: 1,
})

export const logModel = model<Log>(COLLECTION_NAME, LOG_SCHEMA);

export const LOG_MODEL = 'LOG_MODEL';
