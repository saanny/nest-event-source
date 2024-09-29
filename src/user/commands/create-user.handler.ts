import { CommandBus, CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { CassandraService } from 'src/provider/cassandra.service';
import { UserCreatedEvent } from '../events/user-created.event';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly cassandraService: CassandraService,
  private readonly eventBus: EventBus,

  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { userId, name } = command;

 
    const event = { userId, name };

 
    const query =
      'INSERT INTO user_events (user_id, event_id, event_type, event_data, event_timestamp) VALUES (?, now(), ?, ?, toTimestamp(now()))';

    try {
   
      await this.cassandraService.executeQuery(query, [
        userId,
        'UserCreated',
        JSON.stringify(event),
      ]);

   
          this.eventBus.publish(new UserCreatedEvent(userId, name)); 
 
      console.log(`UserCreated event stored: ${userId}, ${name}`);
    } catch (error) {
    
      console.error('Error inserting user event into Cassandra', error);
      throw new Error('Failed to store UserCreated event');
    }
  }
}
