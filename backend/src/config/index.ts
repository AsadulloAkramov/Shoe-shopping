import * as dotenv from 'dotenv';
import { ConfigurationOptions } from './configurationOptions';
dotenv.config();

const configurations: ConfigurationOptions = {
  application: {
    http: {
      port: parseInt(process.env.APP_HTTP_PORT) || 3000
    }
  },
  mongodb: {
    auth: process.env.MONGODB_PASSWORD && process.env.MONGODB_USER ? true : false,
    port: parseInt(process.env.MONGODB_PORT) || 27017,
    user: process.env.MONwGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE,
    host: process.env.MONGODB_HOST || 'localhost'
  },
  redis: {
    auth: process.env.REDIS_USER && process.env.REDIS_PASSWORD && process.env.REDIS_DATABASE ? true : false,
    user: process.env.REDIS_USER,
    port: +process.env.REDIS_PORT || 6379,
    database: process.env.REDIS_DATABASE || 'app',
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST || '127.0.0.1'
  }
};
export default configurations;
