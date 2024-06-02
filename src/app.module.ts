import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from './logger/logger.module';

import config from '@/config/env.config';
import { validationSchema } from '@/config/env.validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    ,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
