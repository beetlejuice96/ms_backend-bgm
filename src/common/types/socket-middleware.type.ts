import { CustomSocketDto } from '../dtos/custom-socket.dto';

export type SocketMiddlewareType = (
  socket: CustomSocketDto,
  next: (err?: Error) => void,
) => void;
