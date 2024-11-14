export const LOG_LEVEL = ['debug', 'info', 'warn', 'error', 'critical'] as const;
export type LogLevel = (typeof LOG_LEVEL)[number];

export const SOURCE_TYPE = ['cloudwatch', 'rabbitmq', 'http'] as const;
export type SourceType = (typeof SOURCE_TYPE)[number];

export type LogSource = {
  type: SourceType;
  entity: string;
  entityInstance: string;
};

export type LogMetadata = {
  key: string;
  value: string;
};
export interface Log {
  id: string;
  message: string;
  level: LogLevel;
  timestamp: Date;
  source: LogSource;
  metadata: LogMetadata[];
}
