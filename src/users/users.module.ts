import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {UserController} from "./users.controller";
import {UserService} from "./users.service";
import {TokenEntity} from "./entities/token.entity";
import {JwtModule} from "@nestjs/jwt";
import {TokenGuard} from "./token.guard";
import {MailerModule} from "@nestjs-modules/mailer";
import {UserMailService} from "./userMail.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity]), JwtModule.register({
        global: true,
        secret: "234",
        signOptions: { expiresIn: '60s' },
    }), MailerModule.forRoot({
            transport: {
                host: "smtp.gmail.com",
                port: "465",
                ignoreTLS: true,
                secure: true,
                auth: {
                    user: "stellgame.pro@gmail.com",
                    pass: "gxizpxlquxejupva",
                },
            }
    })],
    controllers: [UserController],
    providers: [UserService, UserMailService, TokenGuard],

})
export class UsersModule {
}
