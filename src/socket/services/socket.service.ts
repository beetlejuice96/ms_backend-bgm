import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Server } from 'socket.io';

import { LoggerService } from '@/logger/services/logger.service';

@Injectable()
export class SocketService {
  private className = SocketService.name;
  private server: Server;

  constructor(private readonly loggerService: LoggerService) {}

  setServer(server: Server): void {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'setServer',
      });
      this.server = server;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'setServer',
        payload: e,
      });
      throw e;
    }
  }

  getServer(): Server {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'getServer',
      });
      if (!this.server) {
        throw new InternalServerErrorException(
          'Socket.io server has not been initialized yet.',
        );
      }
      return this.server;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'getServer',
        payload: e,
      });
      throw e;
    }
  }
}
