import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

dotenv.config();

const expressApp: express.Application = express();
expressApp.use(express.static(path.join(__dirname, 'public')));

async function bootstrap() {
    console.log('bootstrap');
    const app = await NestFactory.create(ApplicationModule, expressApp, null);
    app.setGlobalPrefix('api');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    await app.listen(process.env.PORT, () => {
        console.log(`Application is listining on port ${process.env.PORT}`);
    });
}
bootstrap();
