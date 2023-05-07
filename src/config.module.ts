import {Module} from '@nestjs/common';
import {ConfigModule as NestConfigModule} from '@nestjs/config'

@Module({
    imports: [NestConfigModule.forRoot({
        envFilePath: ['.env.development.local', '.env.development'],
    })]
})
export class ConfigModule {
}
