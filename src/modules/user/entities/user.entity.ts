import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Subscription } from '../../subscription/entities/subscription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  // Relação One-to-Many com Subscription
  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
