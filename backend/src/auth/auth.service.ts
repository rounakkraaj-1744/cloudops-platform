import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import type { PrismaService } from "../prisma/prisma.service"
import type { UsersService } from "../users/users.service"
import type { RegisterDto } from "./dto/register.dto"
import { Provider, type User } from "@prisma/client"

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new ConflictException("Email already in use")
    }
    const hashedPassword = await this.hashPassword(password)

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        provider: Provider.LOCAL,
        settings: {
          create: {}, 
        },
      },
    })

    const { password: _, ...result } = user
    return result
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    if (!user.password) {
      throw new UnauthorizedException("Please login with your OAuth provider")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const { password: _, ...result } = user
    return result
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    }
  }

  async oauthLogin(user: any) {
    return this.login(user)
  }

  async getProfile(user: User) {
    const { password, ...result } = user
    return result
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  async validateOAuthUser(profile: any, provider: Provider): Promise<User> {
    const { email, name, id: providerId } = profile

    if (!email) {
      throw new BadRequestException("Email is required from OAuth provider")
    }

    let user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (user) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          provider,
          providerId,
          emailVerified: true,
        },
      })
    } else {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          provider,
          providerId,
          emailVerified: true,
          settings: {
            create: {}, 
          },
        },
      })
    }

    return user
  }
}
