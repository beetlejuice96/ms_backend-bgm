import { SocketMiddlewareType } from '../types/socket-middleware.type';
import { CustomSocketDto } from '../dtos/custom-socket.dto';
import { AuthService } from '@/api/auth/services/auth.service';
import { LoggerService } from '@/logger/services/logger.service';

export const WsAuthJwtMiddleware = (
  authService: AuthService,
  loggerService: LoggerService,
): SocketMiddlewareType => {
  return async (socket: CustomSocketDto, next) => {
    try {
      const jwt = socket.handshake.headers.authorization?.split(' ')[1];
      if (!jwt) {
        throw new Error('Unauthorized');
      }

      const response = await authService.jwtAuthValidate(jwt);
      if (!response) {
        throw new Error('Unauthorized');
      }
      socket.userId = response.id;

      next();
    } catch (e) {
      loggerService.error({
        className: WsAuthJwtMiddleware.name,
        method: WsAuthJwtMiddleware.name,
        payload: e?.message,
      });
      next(new Error(e?.message));
    }
  };
};
