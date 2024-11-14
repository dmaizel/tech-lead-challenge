import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { mongoProviders } from './mongo.provider';

@Module({
  providers: [...mongoProviders],
  exports: [...mongoProviders],
})
export class MongoModule {
  constructor() {}
  async onModuleDestroy() {
    console.info('[MongoDB] - closing connection');
    await mongoose.connection.close();
  }
}
