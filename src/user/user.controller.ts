import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async createUser(@Body() body: { userId: string, name: string }) {
    const { userId, name } = body;
    return this.commandBus.execute(new CreateUserCommand(userId, name));
  }


}
