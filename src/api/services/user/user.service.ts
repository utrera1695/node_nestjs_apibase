import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import * as bcrypt from 'bcrypt';
import { NewUserInterface } from '../../interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(data: NewUserInterface): Promise<User> {
    data.password = bcrypt.hashSync(data.password, 10);
    return this.usersRepository.create(data);
  }
  async findOneById(userId: number): Promise<User> {
    return await this.usersRepository.findOne(userId);
  }
  async findOneByData(data: any): Promise<User> {
    return await this.usersRepository.findOne(data);
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email: email });
  }
  async updateUserById(data: any, userId: number) {
    await this.usersRepository.update(userId, data);
  }
}
