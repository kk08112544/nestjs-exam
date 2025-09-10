import { Injectable } from '@nestjs/common';
import {Users,Prisma} from '@prisma/client'
import { PrismaService } from "src/prisma.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { dmmfToRuntimeDataModel } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {



  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

   

  async create(data: Users): Promise<any> {
    const hashedPassword: string = await bcrypt.hash(data.password,10);
    const users = await this.prisma.users.create({
      data:{
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      select:{
        id:true,
        name:true,
        email:true,
        created_at:true
      }
    });
     const token = this.jwtService.sign({userId:users.id,email:users.email});
    return {user:users, token};

  }

   async validateUser(email: string, password: string): Promise<any>{
  const user = await this.prisma.users.findUnique({
    where: {email: String(email)},
   
  })

 }


}
