import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { TimeStampsEntity } from './timeStamps.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User extends TimeStampsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @Column({ type: 'varchar', length: 70 })
  @IsNotEmpty({ message: 'The password is required' })
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @Exclude()
  refreshToken?: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
