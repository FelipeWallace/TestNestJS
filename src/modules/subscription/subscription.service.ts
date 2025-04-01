import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    if (!user) throw new Error('Usuário não encontrado');

    const newSubscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      user,
    });

    return this.subscriptionRepository.save(newSubscription);
  }

  async findAll() {
    return this.subscriptionRepository.find({ relations: ['user'] });
  }
}
