import {Module} from '@nestjs/common';
import {TypeOrmModule as NestTypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        NestTypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: true,
        }),
    ],
})
export class TypeOrmModule {
}