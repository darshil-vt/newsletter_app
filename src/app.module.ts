import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './modules/auth/auth.service';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { CampaignController } from './modules/campaign/campaign.controller';
import { Campaign } from './modules/campaign/campaign.entity';
import { CampaignService } from './modules/campaign/campaign.service';
import { ClickState } from './modules/clickstats/clickstats.entity';
import { List } from './modules/lists/list.entity';
import { ListsController } from './modules/lists/lists.controller';
import { ListsService } from './modules/lists/lists.service';
import { OrganizationController } from './modules/organization/organization.controller';
import { Organization } from './modules/organization/organization.entity';
import { OrganizationService } from './modules/organization/organization.service';
import { SubscribersController } from './modules/subscribers/subscribers.controller';
import { SubscribersService } from './modules/subscribers/subscribers.service';
import { UserController } from './modules/user/user.controller';
import { User } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Subscriber } from './modules/subscribers/subscriber.entity';
import { EmailService } from './modules/email/email.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'admin123', 
      signOptions: { expiresIn: '4h' },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async  (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'admin@123',
        database: 'postgres',
        entities: [User, Organization, Campaign, ClickState, Subscriber, List],
        synchronize: true
      })
    }),
    TypeOrmModule.forFeature([User, Organization, Campaign, ClickState, Subscriber, List]),
  ],
  controllers: [AppController, UserController, OrganizationController, SubscribersController, ListsController, CampaignController],
  providers: [AppService, UserService, OrganizationService, AuthService, JwtStrategy, SubscribersService, ListsService, CampaignService, EmailService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'subscribers', method: RequestMethod.ALL },
        { path: 'organization', method: RequestMethod.ALL },
        { path: 'lists', method: RequestMethod.ALL },
        { path: 'campaign', method: RequestMethod.ALL },
      );
  }
}
