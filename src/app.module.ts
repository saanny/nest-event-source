import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from './user/user.module';

@Module({
  imports: [CqrsModule, UserModule],
})
export class AppModule {}
