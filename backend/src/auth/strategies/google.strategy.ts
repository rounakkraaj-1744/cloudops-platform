import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, type VerifyCallback } from "passport-google-oauth20"
import type { ConfigService } from "@nestjs/config"
import type { AuthService } from "../auth.service"
import { Provider } from "@prisma/client"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: "/auth/google/callback",
      scope: ["email", "profile"],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, name, emails } = profile
    const user = await this.authService.validateOAuthUser(
      {
        id,
        email: emails[0].value,
        name: `${name.givenName} ${name.familyName}`,
      },
      Provider.GOOGLE,
    )
    done(null, user)
  }
}
