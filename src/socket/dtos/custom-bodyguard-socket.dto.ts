import { CustomSocketDto } from '@/common/dtos/custom-socket.dto';
import { IntersectionType } from '@nestjs/swagger';

export class CustomBodyguardSocketDto extends IntersectionType(
  CustomSocketDto,
) {
  routeId!: number;
  constructor(params: CustomSocketDto) {
    super();
    Object.assign(this, params);
  }
}
