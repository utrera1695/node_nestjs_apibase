import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { TokenInterface } from '../../interfaces/token.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.body?.refreshToken;
        },
      ]),
      secretOrKey: configService.get('jwtConstants.secret'),
      passReqToCallback: true,
    });
  }

  async validate(payload) {
    const refreshToken = payload.refreshToken;
    return this.authService.getUserIfRefreshTokenMatches(refreshToken);
  }
}
