import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: '用户ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名' })
  @Column({ length: 50, unique: true })
  username: string;

  @ApiProperty({ description: '昵称' })
  @Column({ length: 50, nullable: true })
  nickname: string;

  @ApiProperty({ description: '头像URL' })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({ description: '个人简介' })
  @Column({ type: 'text', nullable: true })
  bio: string;

  @ApiProperty({ description: '个人网站' })
  @Column({ nullable: true })
  website: string;

  @ApiProperty({ description: '来源' })
  @Column({ length: 50, nullable: true })
  source: string;

  @ApiProperty({ description: '设置' })
  @Column({ type: 'json', nullable: true })
  settings: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '是否删除' })
  @Column({ default: false })
  isDeleted: boolean;

  @ApiProperty({ description: '是否激活' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: '权限列表' })
  @Column({ type: 'json', nullable: true })
  permissions: string[];
}
