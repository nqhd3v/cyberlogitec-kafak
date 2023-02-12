import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminalModule } from './terminal/terminal.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { OperationTypeModule } from './operation-type/operation-type.module';
import { CarrierTypeModule } from './carrier-type/carrier-type.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        UPLOAD_DIRECTORY_PATH: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_DATE: Joi.number().required(),
      }),
      envFilePath: '.env',
    }),
    // TerminalModule,
    // ConfigurationModule,
    // OperationTypeModule,
    // CarrierTypeModule,
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
