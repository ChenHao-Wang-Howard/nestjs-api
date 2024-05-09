import { ForbiddenException, Injectable } from "@nestjs/common"
import {BookMark, User} from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { delayWhen } from "rxjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService){

    }
    async signup(dto: AuthDto){
        // generate the password
        const hash = await argon.hash(dto.password);
        // save the new user in the db
        try{
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                /*
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                }
                */
            });
            //delete user.hash;

            // return the saved user
            return user;
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException(
                        'Credentials taken'
                    );
                }
            }
            throw error;

        }
        

        
    }
    async signin(dto: AuthDto) {
        // find the user by email

        // if user does not exist throw exception

        //compare password
        //if password incorrect throw exception

        //send back the user
        return {msg: 'i have sign in'} ;
    }

}