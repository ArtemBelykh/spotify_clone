import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";

import * as cookieParser from 'cookie-parser';

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());


    app.enableCors({credentials: true, origin: true})
    await app.listen(3004);
}

bootstrap();
