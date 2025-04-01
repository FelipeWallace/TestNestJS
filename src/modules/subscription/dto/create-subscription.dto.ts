import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  plan: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  userId: number;
}
