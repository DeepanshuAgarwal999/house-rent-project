import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    const user = this.userRepository.find();
    if (!user) throw new NotFoundException('Users not found');
    return user;
  }

  async update(id: number, user: UpdateUserDto): Promise<User | null> {
    const updateResult = await this.userRepository.update(id, user);
    if (updateResult.affected === 0) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }
    return updatedUser;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    const { password, role, ...result } = user;
    return result;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
