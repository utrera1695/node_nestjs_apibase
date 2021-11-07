import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && bcrypt.compareSync(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };
    const refreshPayload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(refreshPayload);
    await this.usersService.updateUserById({ refreshToken }, user.id);
    return {
      token,
      refreshToken,
    };
  }
  async getUserIfRefreshTokenMatches(refreshToken: string) {
    const user = await this.usersService.findOneByData({ refreshToken });

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
