import { CustomSocketDto } from '@/common/dtos/custom-socket.dto';
import { IntersectionType } from '@nestjs/swagger';

export class CustomCustomerSocketDto extends IntersectionType(CustomSocketDto) {
  routeId!: number;
  constructor(params: CustomCustomerSocketDto) {
    super();
    Object.assign(this, params);
  }
}
