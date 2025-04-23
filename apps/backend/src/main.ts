import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Access the underlying Express instance
  const expressApp = app.getHttpAdapter().getInstance();

  // Use body-parser
  expressApp.use(bodyParser.json({ limit: '10mb' }));
  expressApp.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  const port = process.env.PORT || 5000;
  await app.listen(port);
  Logger.log(`🚀 Server running on port ${port}`);
}
bootstrap();
