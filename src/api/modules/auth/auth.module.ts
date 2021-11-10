import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../services/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../services/auth/jwt.strategy';
import { AuthController } from '../../controllers/auth/auth.controller';
import configuration from '../../../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configuration().jwtConstants.secret,
          signOptions: { expiresIn: configuration().jwtConstants.expiresIn },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
