import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log(pass, bcrypt.compareSync(pass, user.password));
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new NotFoundException();
    }
    return null;
  }
  async login(user: any) {
    console.log(user);
    const payload = {
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
