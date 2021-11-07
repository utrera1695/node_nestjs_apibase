import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import configuration from './config/configuration';

const port = configuration().port;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(csurf());
  app.use(helmet());
  await app.listen(port);
}
bootstrap().then((r) => console.log('Api loaded in port:', port));
