import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as expressJWT from 'express-jwt';

import { HttpStatus } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

dotenv.config();

const expressApp: express.Application = express();
expressApp.use(express.static(path.join(__dirname, '../../public')));

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, expressApp, null);
   app.setGlobalPrefix('api');
    // app.set('views', path.join(__dirname, '../../public'));
    // app.set('view engine', 'hbs');
    // app.set('*.*', express.static(path.join(__dirname, 'public')));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressJWT({ secret: process.env.JWT_SWECRET }).unless({ path: '/api/auth/authenticate' }), (error, req, res, next) => {
        if (error.name === 'UnauthorizedError') {
            res.status(HttpStatus.UNAUTHORIZED).json({
                message: error.message
            });
        }
    });

    await app.listen(process.env.PORT, () => {
        console.log('bootstrap:', __dirname);
        console.log(`Application is listining on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
    });
}
bootstrap();
