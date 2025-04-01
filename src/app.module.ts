import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'nestuser'),
        password: configService.get<string>('DB_PASS', 'nestpass'),
        database: configService.get<string>('DB_NAME', 'nestdb'),
        autoLoadEntities: true,
        synchronize: true, // Apenas para desenvolvimento
      }),
    }),
    UserModule,
    SubscriptionModule,
  ],
})
export class AppModule {}
