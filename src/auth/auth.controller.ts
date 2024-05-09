import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    //dependency injection
    constructor(private authService: AuthService){}

    //decorator
    @Post('signup')
    signup(@Body() dto: AuthDto){//Request comes from express
        console.log({
            dto,
        });
        return this.authService.signup(dto);
        
    }

    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto);
    }
}