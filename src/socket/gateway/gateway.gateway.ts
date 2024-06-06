import { LoggerService } from '@/logger/services/logger.service';
import { OnApplicationShutdown } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  // SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from '../services/socket.service';

enum EVENTS {
  LEAVE = 'leave',
  TRACK = 'track',
}

@WebSocketGateway({
  namespace: 'socket',
  cors: {
    origin: '*',
  },
})
export class GatewayGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnApplicationShutdown
{
  private className = GatewayGateway.name;
  constructor(
    private readonly socketService: SocketService,
    private readonly loggerService: LoggerService,
  ) {}

  afterInit(server: Server): any {
    this.socketService.setServer(server);
    this.loggerService.log({
      className: this.className,
      method: 'afterInit',
    });
  }

  handleConnection(client: Socket) {
    this.loggerService.log({
      className: this.className,
      method: 'handleConnection',
      payload: {
        id: client.id,
        handshake: client.handshake,
      },
    });
    const { routeId } = client.handshake.query;
    client.join(`route-${routeId}`);
  }

  handleDisconnect(client: Socket): any {
    const { routeId } = client.handshake.query;
    client.leave(`route-${routeId}`);
    this.loggerService.log({
      className: this.className,
      method: 'handleDisconnect',
      payload: client,
    });
  }

  onApplicationShutdown(signal?: string) {
    this.socketService.getServer().close();
    this.loggerService.log({
      className: this.className,
      method: 'onApplicationShutdown',
    });
  }

  @SubscribeMessage(EVENTS.TRACK)
  track(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { routeId } = client.handshake.query;
    this.loggerService.log({
      className: this.className,
      method: 'track',
      payload: {
        routeId,
        data,
      },
    });
    client.to(`route-${routeId}`).emit(EVENTS.TRACK, data);
  }
}
