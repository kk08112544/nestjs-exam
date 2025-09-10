import { Controller, Get, Post, Body, Put, Param, Delete, Res,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import {Users} from './auth.model'
import { LocalAuthGuard } from "src/token/local/local-auth.guard";
import { JwtAuthGuard } from "src/token/jwt/jwt-auth.guard";



@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


@Post('signup')
async createNewUser(@Body() postData: any, @Res() res: Response): Promise<any> {
  if (!postData.name ||  !postData.email || !postData.password) {
    return res.status(400).json({ message: 'Content is not empty' });
  }
  try {
      if(postData.password.length>=6){
          const data = await this.authService.create(postData);
        return res.status(201).json(data);
      }else{
        return res.status(400).json({message:'password less'})
      }
    
    
  } catch (error) {
    return res.status(500).json({ error: 'Error creating user', details: error.message });
  }
}


}
