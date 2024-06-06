import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from './logger/logger.module';

import config from '@/config/env.config';
import { validationSchema } from '@/config/env.validation-schema';
import { SocketModule } from './socket/socket.module';
import { ContextStorageModule } from './context-storage/context-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    LoggerModule,
    ContextStorageModule,
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
