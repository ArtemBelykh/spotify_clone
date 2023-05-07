import {Body, Controller, Get, Next, Post, Put, Req, Res, UseInterceptors} from "@nestjs/common";
import {Request, Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {UserService} from "./users.service";
import {validationResult} from "express-validator";
import {ApiError} from "./exceptions/api-error";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/register')
    @UseInterceptors(FileInterceptor(''))
    async registerUsers(
        @Req() req: Request,
        @Res() res: Response,
        @Next() next
    ) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password, firstname, lastname, avatar} = req.body;
            const userData = await this.userService.register(email, password, firstname, lastname, avatar);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    @Get('/activate/:link')
    async activateUsers(
        @Req() req: Request,
        @Res() res: Response,
        @Next() next
    ) {
        try {
            const {link} = req.params
            await this.userService.activate(link)
            return res.redirect("http://localhost:3000/")
        } catch (e) {
            next(e)
        }

    }

    @Post('/login')
    async loginUsers(
        @Req() req: Request,
        @Res() res: Response,
        @Next() next,
    ) {
        try {
            const {email, password} = req.body;

            // console.log(req.body)
            const userData = await this.userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    @Post('/logout')
    async logout(
        @Req() req: Request,
        @Res() res: Response,
        @Next() next
    ) {
        try {
            const {refreshToken} = req.cookies;
            const token = await this.userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    @Get('/refresh')
    async refreshUsers(
        @Req() req: Request,
        @Res() res: Response,
        @Next() next
    ) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await this.userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    @Put('updateUsers/:id')
    async updateUsers(
        @Req() req: Request,
        @Res() res: Response
    ) {
        console.log(req.body)
        return res.send("work")
    }
}
