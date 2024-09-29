import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'cassandra-driver';

@Injectable()
export class CassandraService implements OnModuleInit {
  private client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || 'localhost'],
      localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1',
    });
  }

  async onModuleInit() {
    await this.ensureKeyspace();
  }

  async ensureKeyspace() {
    const keyspace = process.env.CASSANDRA_KEYSPACE || 'my_keyspace';
    const query = `CREATE KEYSPACE IF NOT EXISTS ${keyspace} 
                   WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`;
    
    await this.client.execute(query);
    console.log(`Keyspace ${keyspace} ensured.`);
    
    this.client.keyspace = keyspace;
  }

  async executeQuery(query: string, params: any[] = []) {
    return this.client.execute(query, params);
  }
}
