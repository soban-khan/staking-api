import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ENV } from 'src/constants/env.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }

      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );

      await this.usersRepository.save({
        ...createUserDto,
        password: hashedPassword,
        totalBalance: 10000, // Mock balance
        availableBalance: 10000,
      });
      return {};
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokenResponse(user);
  }

  private async generateTokenResponse(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: ENV.JWT.SECRET,
      expiresIn: ENV.JWT.EXPIRY,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        totalBalance: user.totalBalance || 0,
        availableBalance: user.availableBalance || 0,
        stakedBalance: user.stakedBalance || 0,
        totalRewards: user.totalRewards || 0,
      },
    };
  }

  async findAll(): Promise<{ results: Array<object>; totalCount: number }> {
    try {
      const results = await this.usersRepository.findAndCount({
        select: ['id', 'email', 'walletAddress', 'availableBalance'],
        order: {
          id: 'ASC',
        },
      });
      return { results: results[0], totalCount: results[1] };
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });
      if (!user) throw new HttpException('No Such User', HttpStatus.NOT_FOUND);

      return user;
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userToUpdate = await this.usersRepository.findOne({
        where: { id },
      });
      if (!userToUpdate)
        throw new HttpException('User does Not Exist', HttpStatus.NOT_FOUND);

      await this.usersRepository.update(id, updateUserDto);
      return {};
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.usersRepository.delete(id);
      if (!deletedUser.affected)
        throw new HttpException('No Such User', HttpStatus.NOT_FOUND);

      return {};
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async updateBalances(
    userId: number,
    updates: Partial<
      Pick<User, 'availableBalance' | 'stakedBalance' | 'totalRewards'>
    >,
  ): Promise<User> {
    await this.usersRepository.update(userId, updates);
    return this.findOne(userId);
  }
}
