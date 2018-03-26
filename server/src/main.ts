// import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as hemmet from 'helmet';

// import * as expressJWT from 'express-jwt';

// import { HttpStatus } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { LogModule } from './log/log.module';
import { LogService } from './log/log.service';
import { apiPath } from './api.path';
import { NotFoundExceptionFilter } from './not-found-exception.filter';

// dotenv.config();

const expressApp: express.Application = express();
expressApp.use(express.static(path.join(__dirname, '../../public')));

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, expressApp, null);
    // const app: INestApplication = await NestFactory.create(ApplicationModule);
    app.useGlobalFilters(new NotFoundExceptionFilter());

    const log = app.select(LogModule).get(LogService);

    // app.setGlobalPrefix(apiPath(1, ''));

    app.set('views', path.join(__dirname, '../../public'));
    app.set('view engine', 'hbs');
    // app.set('*.*', express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(hemmet());
    app.use(cors());

    const swaggerConfig = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('ts-mean sample api')
        .addTag('Auth')
        .addTag('Users')
        .addTag('Contacts')
        .setDescription('Sample REST API that allows to manage list of contacts')
        .setVersion('1.0')
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/swagger', app, swaggerDocument);

    // app.use(expressJWT({ secret: process.env.JWT_SWECRET }).unless({ path: '/api/auth/authenticate' }), (error, req, res, next) => {
    //     if (error.name === 'UnauthorizedError') {
    //         res.status(HttpStatus.UNAUTHORIZED).json({
    //             message: error.message
    //         });
    //     }
    // });

    await app.listen(process.env.PORT, () => {
        log.info(`Application is listining on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
    });
}
bootstrap();
