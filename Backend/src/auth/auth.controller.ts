import { Body, Controller, Get, Inject, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
 import { LoginUserDto, RegisterUserDto } from './dto/register-user.dto';
import { response } from '../interface/response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService) {
    }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    return this.authService.registerUser(registerUserDto, 'USER')
  }


  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.loginUser(loginUserDto)
  }

}