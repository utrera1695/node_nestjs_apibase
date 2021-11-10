import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import configuration from './config/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = configuration().port;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.use(csurf());
  app.use(helmet());

  /*Swager Config*/
  const config = new DocumentBuilder()
    .setTitle('Proyecto Fenix Api')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /* */
  await app.listen(port);
}
bootstrap().then((r) => console.log('Api loaded in port:', port));
