import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "./database/typeorm.module";
import {ConfigModule} from "./config.module";
import { UsersModule } from './users/users.module';
import { AlbumModule } from './album/album.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
    imports: [TypeOrmModule,ConfigModule, UsersModule, AlbumModule, TracksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
