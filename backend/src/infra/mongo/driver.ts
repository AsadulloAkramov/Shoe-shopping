import * as mongoose from 'mongoose';
import { Database } from '../../core/Drivers/database';
import configurations from '../../config';

const mongo = configurations.mongodb;
export class MongoDriver implements Database {
  private url: string;
  constructor() {
    if (mongo.auth) {
      this.url = `mongodb://${mongo.host}${mongo.user}:$${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}`;
    } else {
      this.url = `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`;
    }
  }

  connect = async (): Promise<void> => {
    try {
      await mongoose.connect(this.url);
      console.log(' Successfully connected to mongodb at: ', this.url);
    } catch (e) {
      console.log(' MongoDB connection error: ', e.stack);
    }
  };
}
