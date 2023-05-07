import {Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";


@Injectable()
export class UserMailService {
    constructor(private mailerService: MailerService) {
    }

    async sendActivationMail(to: string, link: string): Promise<void> {


        await this.mailerService.sendMail({
            from: "spotify@spotify.ru",
            to,
            subject: 'Активация аккаунта на Spotify Clones',
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href={link}>{link}</a>
                    </div>
                `
        })

    }

}