import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { UserEntity } from './user/entities/user.entity';
import { PostEntity } from './post/entities/post.entity';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hazard',
      password: 'hazard',
      database: 'hazard',
      entities: [UserEntity, PostEntity, OrderEntity],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
