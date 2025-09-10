import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { jwtConstants } from 'src/token/constant/constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/token/local/local-strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/token/jwt/jwt-strategy';


@Module({
  imports : [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, // Use a strong secret key here
      signOptions: { expiresIn: '2h' }, // Adjust token expiration time as needed
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
