import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryUserDto {
  @ApiProperty({ description: '页码', example: 1, required: false, default: 1 })
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: '每页数量',
    example: 10,
    required: false,
    default: 10,
  })
  @Type(() => Number)
  pageSize?: number = 10;

  @ApiProperty({ description: '用户名搜索', required: false })
  username?: string;

  @ApiProperty({ description: '邮箱搜索', required: false })
  email?: string;

  @ApiProperty({ description: '昵称搜索', required: false })
  nickname?: string;

  @ApiProperty({ description: '是否激活', required: false })
  @Type(() => Boolean)
  isActive?: boolean;
}
