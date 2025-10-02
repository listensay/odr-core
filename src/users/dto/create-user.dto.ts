import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'john_doe', maxLength: 50 })
  username: string;

  @ApiProperty({ description: '邮箱', example: 'john@example.com' })
  email: string;

  @ApiProperty({ description: '密码', example: 'Password123!', minLength: 6 })
  password: string;

  @ApiProperty({
    description: '昵称',
    example: 'John',
    required: false,
    maxLength: 50,
  })
  nickname?: string;

  @ApiProperty({ description: '头像URL', required: false })
  avatar?: string;

  @ApiProperty({ description: '个人简介', required: false })
  bio?: string;

  @ApiProperty({ description: '个人网站', required: false })
  website?: string;

  @ApiProperty({ description: '来源', required: false, maxLength: 50 })
  source?: string;
}
