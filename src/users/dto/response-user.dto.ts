import { IntersectionType } from '@nestjs/swagger';

import AuditDto from '../../dto/audit.dto';
import IdDto from '../../dto/id.dto';
import { UserDto } from './user.dto';

export class ResponseUserDto extends IntersectionType(
  IntersectionType(IdDto, UserDto),
  AuditDto,
) {}
