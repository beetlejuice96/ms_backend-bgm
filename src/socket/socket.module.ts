import { Module } from '@nestjs/common';
import { GatewayGateway } from './gateway/gateway.gateway';
import { SocketService } from './services/socket.service';

@Module({
  providers: [GatewayGateway, SocketService],
})
export class SocketModule {}
