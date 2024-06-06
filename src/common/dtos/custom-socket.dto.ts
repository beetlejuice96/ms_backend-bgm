import { IntersectionType } from '@nestjs/swagger';
import { Socket } from 'socket.io';

//esto esta manl
export class CustomSocketDto extends IntersectionType(Socket) {
  userId!: number;

  constructor(params: CustomSocketDto) {
    super();
    Object.assign(this, params);
  }
}
