import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const user = await this.userRepository.findOne({
      where: { id: createSubscriptionDto.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const newSubscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      user,
    });

    try {
      return await this.subscriptionRepository.save(newSubscription);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (error as any).code === '23505'
      ) {
        // Código de erro para UNIQUE violation no PostgreSQL
        throw new ConflictException('Já existe uma assinatura com esse nome');
      }
      throw error;
    }
  }

  async findAll(search?: string) {
    const query = this.subscriptionRepository
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.user', 'user'); // Mantém a relação com 'user'

    if (search) {
      query.where(
        'subscription.plan ILIKE :search OR user.name ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    return query.getMany();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.subscriptionRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
