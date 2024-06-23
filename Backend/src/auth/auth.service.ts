import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto/register-user.dto'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import generateVerificationCode from '../utils/generateID';
import { response } from '../interface/response';
import { hashPassword } from '../utils/helper'
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) { }
    private logger = new Logger("Auth service");

    public async registerUser(registerUserDto: RegisterUserDto, roles: any): Promise<any> {
        try {
            const { password, email, name } = registerUserDto
            let existingUser;
            if (email) {
                this.logger.debug(`Validating user with email: ${email}`);
                existingUser = await this.userModel.findOne({ email }).lean();
                if (existingUser) {
                    this.logger.error(`User already exists with this email: ${email}`);
                    throw new HttpException("User already exists with this email", HttpStatus.CONFLICT);
                }
            } else {
                throw new HttpException("Either email or phone number must be provided", HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await hashPassword(password);
            const newUser = await this.userModel.create({

                email,
                password: hashedPassword,
                name,
            });
            return {
                message: `${roles} created successfully`,
                data: newUser
            }
        } catch (error) {
            if (error.code === "P2002") {
                throw new HttpException("User already exists with username", HttpStatus.CONFLICT);
            }
            throw new HttpException(error.message, error.status)

        }
    }


    async loginUser(loginUserDto: LoginUserDto): Promise<any> {
        try {
            const { email, password } = loginUserDto;
            const existingUser = await this.userModel.findOne({ email }).lean();
            if (!existingUser) {
                this.logger.error(`This user does not exist: ${email}`);
                throw new HttpException("This user does not exist",
                    HttpStatus.CONFLICT);
            }
            if (existingUser && await bcrypt.compare(password, existingUser.password)) {
                const { password, ...result } = existingUser;
                const token = this.jwtService.sign(result)
                return {
                    message: 'Login Success',
                    data: { ...result, token }
                }

            }

            throw new HttpException("Password is wrong",
                HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

}