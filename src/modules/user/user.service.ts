import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // async findAll(search?: string) {
  //   const query = this.userRepository.createQueryBuilder('user');

  //   if (search) {
  //     query.where('user.name ILIKE :search OR user.email ILIKE :search', {
  //       search: `%${search}%`,
  //     });
  //   }

  //   return query.getMany();
  // }

  async findAll(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const query = this.userRepository.createQueryBuilder('user');

    // Busca por nome ou email
    if (search) {
      query.where('user.name ILIKE :search OR user.email ILIKE :search', {
        search: `%${search}%`,
      });
    }

    // Paginação
    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
