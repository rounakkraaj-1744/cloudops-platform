import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-github2"
import type { ConfigService } from "@nestjs/config"
import type { AuthService } from "../auth.service"
import { Provider } from "@prisma/client"

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>("GITHUB_CLIENT_ID"),
      clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET"),
      callbackURL: "/auth/github/callback",
      scope: ["user:email"],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const { id, username, emails } = profile
    const user = await this.authService.validateOAuthUser(
      {
        id,
        email: emails[0].value,
        name: username,
      },
      Provider.GITHUB,
    )
    return user
  }
}
