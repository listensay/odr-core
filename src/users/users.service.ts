import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './entities/user.entity';
import { ResponseUtil } from 'src/common/utils/response.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    // 先检测是否已存在用户名或者邮箱
    const existingUser = await this.userRepository.findOne({
      where: [{ username: user.username }, { email: user.email }],
    });

    if (existingUser) {
      if (existingUser.username === user.username) {
        return ResponseUtil.error('用户名已存在');
      } else if (existingUser.email === user.email) {
        return ResponseUtil.error('邮箱已存在');
      }
    }

    // 保存用户
    await this.userRepository.save(user);

    return ResponseUtil.success(null, '用户创建成功');
  }

  async findAll(queryUserDto: QueryUserDto) {
    const {
      page = 1,
      pageSize = 10,
      username,
      email,
      nickname,
      isActive,
    } = queryUserDto;

    const where: any = {};

    if (username) {
      where.username = Like(`%${username}%`);
    }
    if (email) {
      where.email = Like(`%${email}%`);
    }
    if (nickname) {
      where.nickname = Like(`%${nickname}%`);
    }
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [data, total] = await this.userRepository.findAndCount({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(ids: number[]) {
    await this.userRepository.delete({ id: In(ids) });

    return ResponseUtil.success(null, '删除成功');
  }
}
