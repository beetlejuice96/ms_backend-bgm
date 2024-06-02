import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { WsException } from '@nestjs/websockets';

import { CustomSocketDto } from '../dtos/custom-socket.dto';

@Catch(WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    // super.catch(exception, host);
    const client = host.switchToWs().getClient<CustomSocketDto>();
    client.emit('exception', { status: 'error', message: exception.message });
    client.disconnect();
  }
}
