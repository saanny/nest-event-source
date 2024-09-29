import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user.handler';
import { UserCreatedHandler } from './events/user-created.handler';
import { CassandraService } from 'src/provider/cassandra.service';
import { UserController } from './user.controller';

@Module({
  imports: [CqrsModule],
  controllers:[UserController],
  providers: [CreateUserHandler, UserCreatedHandler,CassandraService],
})
export class UserModule {}
