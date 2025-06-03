import { Injectable, NotFoundException, ForbiddenException, ConflictException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateUserDto } from "./dto/create-user.dto"
import type { UpdateUserDto } from "./dto/update-user.dto"
import * as bcrypt from "bcrypt"
import { Role, Provider } from "@prisma/client"
import type { User } from "@prisma/client"

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, name, role } = createUserDto

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new ConflictException("Email already in use")
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password)

    // Create new user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        provider: Provider.LOCAL,
        settings: {
          create: {}, // Create default settings
        },
      },
    })

    // Remove password from response
    const { password: _, ...result } = user
    return result
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          provider: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.user.count(),
    ])

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne(id: string, currentUser: User) {
    // Admin can view any user, users can only view themselves
    if (currentUser.role !== Role.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException("You can only view your own profile")
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        settings: true,
      },
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    // Remove password from response
    const { password, ...result } = user
    return result
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto, currentUser: User) {
    // Admin can update any user, users can only update themselves
    if (currentUser.role !== Role.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException("You can only update your own profile")
    }

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    // Prepare update data
    const updateData: any = { ...updateUserDto }

    // Hash password if provided
    if (updateUserDto.password) {
      updateData.password = await this.hashPassword(updateUserDto.password)
    }

    // Regular users cannot change their role
    if (currentUser.role !== Role.ADMIN) {
      delete updateData.role
    }

    // Update user
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    })

    // Remove password from response
    const { password, ...result } = updatedUser
    return result
  }

  async remove(id: string, currentUser: User) {
    // Admin can delete any user, users can only delete themselves
    if (currentUser.role !== Role.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException("You can only delete your own account")
    }

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    // Delete user
    await this.prisma.user.delete({
      where: { id },
    })

    return { message: "User deleted successfully" }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }
}
