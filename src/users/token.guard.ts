import {
    Injectable, UseGuards,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TokenEntity} from "./entities/token.entity";

@Injectable()
export class TokenGuard {
    constructor(@InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>, private jwtService: JwtService) {
    }

    public generateTokens(payload: object): any {
        const accessToken = this.jwtService.sign(payload, {secret: "123", expiresIn: '30s'})
        const refreshToken = this.jwtService.sign(payload, {secret: "321", expiresIn: '30s'})
        return {
            accessToken,
            refreshToken
        }
    }

    public validateAccessToken(token): any {
        try {
            const userData = this.jwtService.verify(token, {secret: "123"});
            return userData;
        } catch (e) {
            return null;
        }
    }

    public validateRefreshToken(token): any {
        try {
            const userData = this.jwtService.verify(token, {secret: "321"});
            return userData;
        } catch (e) {
            return null;
        }
    }

    public async saveToken(userId: any, refreshToken: any): Promise<any> {
        const tokenData = await this.tokenRepository.findOne({where: {userId: userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await this.tokenRepository.save(tokenData)
        }
        const token = await this.tokenRepository.create({refreshToken, userId: userId})
        await this.tokenRepository.save(token)
        return token;
    }

    public async removeToken(refreshToken): Promise<any> {
        const tokenData = await this.tokenRepository.delete({refreshToken})
        return tokenData;
    }

    public async findToken(refreshToken): Promise<any> {
        const tokenData = await this.tokenRepository.findOne({where: {refreshToken}})
        return tokenData;
    }
}