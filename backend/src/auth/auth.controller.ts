import { Controller, Post, Body, UseGuards, Get, Req, Res } from "@nestjs/common"
import type { AuthService } from "./auth.service"
import type { RegisterDto } from "./dto/register.dto"
import type { LoginDto } from "./dto/login.dto"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { GoogleAuthGuard } from "./guards/google-auth.guard"
import { GithubAuthGuard } from "./guards/github-auth.guard"
import { GetUser } from "../users/decorators/get-user.decorator"
import { Public } from "./decorators/public.decorator"
import type { User } from "@prisma/client"
import type { Response } from "express"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() loginDto: LoginDto, @Req() req: any) {
    return this.authService.login(req.user)
  }

  @Get("profile")
  async getProfile(@GetUser() user: User) {
    return this.authService.getProfile(user)
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google")
  async googleAuth() {
    // Guard redirects to Google
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    const result = await this.authService.oauthLogin(req.user)
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.access_token}`)
  }

  @Public()
  @UseGuards(GithubAuthGuard)
  @Get("github")
  async githubAuth() {
    // Guard redirects to GitHub
  }

  @Public()
  @UseGuards(GithubAuthGuard)
  @Get("github/callback")
  async githubAuthCallback(@Req() req: any, @Res() res: Response) {
    const result = await this.authService.oauthLogin(req.user)
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.access_token}`)
  }
}
