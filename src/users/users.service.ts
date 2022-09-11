import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userModel.build({ ...createUserDto });
    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user)
      throw new HttpException(
        `User with id: ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userModel.update(updateUserDto, {
      where: { id: id },
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const affected = await this.userModel.destroy({ where: { id: id } });
    if (!affected)
      throw new HttpException(
        `User with id: ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
  }
}
