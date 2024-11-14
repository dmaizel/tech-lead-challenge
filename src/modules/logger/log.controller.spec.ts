import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('LogController', () => {
  let testingModule: TestingModule;
  let app: INestApplication;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('', () => {
    it('should return "OK"', async () => {
      const response = await request(app.getHttpServer()).get('/');

      expect(response.status).toBe(200);
    });
  });
});
