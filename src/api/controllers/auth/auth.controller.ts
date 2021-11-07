import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../guards/local.guard';
import JwtRefreshGuard from '../../guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtRefreshGuard)
  @Post('auth/refresh')
  refresh(@Req() req) {
    return this.authService.login(req.user);
  }
}
