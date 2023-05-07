import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./entities/user.entity";
import {ApiError} from "./exceptions/api-error";
import {v4} from 'uuid';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./dto/create-user.dto";
import {TokenGuard} from "./token.guard";
import {UserMailService} from "./userMail.service";


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private readonly userMailService: UserMailService, private readonly tokenGuard: TokenGuard) {
    }

    public async register(email: string, password: string, firstname: string, lastname: string, avatar: string) {
        const candidate = await this.userRepository.findOne({where: {email: email}})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = v4(); // v34fa-asfasf-142saf-sa-asf

        const uid = v4()
        const user = await this.userRepository.create({
            uid,
            email,
            firstname,
            lastname,
            avatar,
            password: hashPassword,
            activationLink
        })
        await this.userRepository.save(user)
        await this.userMailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        // const userDto = new CreateUserDto(user); // id, email, isActivated
        const tokens = this.tokenGuard.generateTokens({...user});

        await this.tokenGuard.saveToken(user.id, tokens.refreshToken);

        return {...tokens, ...user}
    }

    public async activate(activationLink: any) {
        const user = await this.userRepository.findOne({where: {activationLink: activationLink}})

        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await this.userRepository.save(user)


    }

    public async login(email: string, password: string) {
        const user = await this.userRepository.findOne({where: {email: email}})

        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const tokens = await this.tokenGuard.generateTokens({...user});

        await this.tokenGuard.saveToken(user.id, tokens.refreshToken)
        return {...tokens, ...user}
    }

    public async logout(refreshToken) {
        const token = await this.tokenGuard.removeToken(refreshToken)
        return token;
    }

    public async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await this.tokenGuard.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenGuard.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await this.userRepository.findOne({where: {id: userData.id}});
        const tokens = await this.tokenGuard.generateTokens({...user});

        await this.tokenGuard.saveToken(user.id, tokens.refreshToken);
        return {...tokens, ...user}
    }

    // public async updateUser(userId) {
    //     const user = await this.userRepository.findOne({where: {id: userId}})
    //
    //     user.
    // }
}