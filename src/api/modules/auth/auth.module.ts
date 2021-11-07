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

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: configuration().jwtConstants.secret,
      signOptions: { expiresIn: configuration().jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
