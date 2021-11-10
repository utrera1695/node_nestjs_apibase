import { Injectable, NotFoundException } from '@nestjs/common';
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
    const salt = await bcrypt.genSalt();
    data.password = bcrypt.hashSync(data.password, salt);
    console.log(data);
    return this.usersRepository.save(data);
  }
  async findOneById(userId: number): Promise<User | NotFoundException> {
    const user = await this.usersRepository.findOne(userId);
    if (!user) throw new NotFoundException();
    else return new User(user);
  }
  async findOneByData(data: any): Promise<User> {
    return await this.usersRepository.findOne(data);
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email: email });
  }
  async updateUserById(data: any, userId: number) {
    console.log(data, userId);
    return await this.usersRepository.update(userId, data);
  }
  async softDelete(userId: number) {
    return await this.usersRepository.softDelete(userId);
  }
}
