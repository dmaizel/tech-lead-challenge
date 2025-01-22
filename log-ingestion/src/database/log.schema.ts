import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: false })
export class LogRecord extends Document {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ type: Date, required: true, index: true })
  timestamp: Date;

  @Prop({ required: true, enum: ['app', 'container', 'pod', 'vm'] })
  host: string;

  @Prop({ required: true, enum: ['info', 'error', 'debug'] })
  type: string;

  @Prop({ required: true, enum: ['dev', 'stage', 'prod'] })
  env: string;

  @Prop({ required: true, enum: ['http', 'db', 'system'], index: true })
  logSource: string;

  @Prop({
    type: Object,
    required: true,
    validate: {
      validator: (value) =>
        typeof value.description === 'string' && value.details,
      message: 'Invalid message format',
    },
  })
  message: {
    description: string;
    details: Record<string, any>;
  };
}

export const LogSchema = SchemaFactory.createForClass(LogRecord);
LogSchema.index({ userId: 1, timestamp: -1 });
LogSchema.index({ userId: 1, logSource: 1, host: 1 });
