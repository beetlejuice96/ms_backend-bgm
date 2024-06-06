import { CustomBodyguardSocketDto } from '../dtos/custom-bodyguard-socket.dto';
import { CustomCustomerSocketDto } from '../dtos/custom-customer-socket.dto';

export type SocketClientType =
  | CustomCustomerSocketDto
  | CustomBodyguardSocketDto;
