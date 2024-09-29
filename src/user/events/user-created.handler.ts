import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';
import { CassandraService } from 'src/provider/cassandra.service';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly cassandraService: CassandraService) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const { userId, name } = event;

    console.log(`Handling event: ${userId}, ${name}`);


    const query = 'INSERT INTO user_projections (user_id, name) VALUES (?, ?)';

    try {
    
      await this.cassandraService.executeQuery(query, [userId, name]);

      console.log(`Projection updated for user: ${userId}, ${name}`);
    } catch (error) {
      
      console.error(`Failed to update projection for user: ${userId}`, error);
    }
  }
}
