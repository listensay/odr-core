import { ApiProperty } from '@nestjs/swagger';

export class DeleteUsersDto {
  @ApiProperty({
    description: '用户ID列表',
    example: [1, 2, 3],
    type: [Number],
  })
  ids: number[];
}
