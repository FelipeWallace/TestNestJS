import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Get,
  Query,
  Post,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('api/v1/subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.subscriptionService.findAll(search);
  }

  @Delete(':id')
  async deleteSubscription(@Param('id') id: number) {
    const deleted = await this.subscriptionService.delete(id);
    if (!deleted) {
      throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Subscription deleted successfully' };
  }
}
