import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CanLogger } from './core/logger/logger.service';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './core/auth/auth.guard';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CanContextService, CanPermissionsGuard } from 'libs/common/src';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LogLevel } from '@nestjs/common';

/**
 * Boot the App
 */
bootstrap();

async function bootstrap() {
  // Create App Instance
  const logLevel:LogLevel[] = ([process.env.APP_LOG_LEVEL]??['error']) as LogLevel[];
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: [...logLevel],
  });

  // Enable Cors
  app.enableCors();
  // Set Static Assests For MVC
  app.useStaticAssets(join(__dirname, '..', 'src', 'browser', 'public'));
  // Set Template Store Default Directory
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'browser', 'views'));
  // Set View Engine
  app.setViewEngine('hbs');
  // Set Global API Path Prefix
  app.setGlobalPrefix('/v1');
  // Use Custom Logger instead of Default Logger
  app.useLogger(new CanLogger());
  // Add Global Authentication to Every Routes & Add CreatedBy and UpdatedBy in request Body
  // app.useGlobalGuards(new AuthGuard());
  // Add Global Role Authorization to Every Routes
  // app.useGlobalGuards(new CanPermissionsGuard());
  // Set The HTTP Secure Header for vulnerabilities
  // app.use(helmet());
  // Get Config Service
  const configService = app.get(ConfigService);
  // Cookie Parser
  app.use(cookieParser(configService.get('COOKIE_PARSER_SECRET')));
  // Initialize Can Context Service
  CanContextService.init(app);
  // Swagger Configuration
  const options = new DocumentBuilder()
    .setTitle('Half Price Bazar Api')
    .setDescription('The Half Price Bazar API description')
    .setVersion('1.0')
    .addTag('Half-Price-Bazar')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1', app, document);

  // Start App
  await app.listen(parseInt(configService.get('PORT')));
}
