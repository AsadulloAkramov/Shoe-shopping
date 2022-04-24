type HttpOptions = {
  port: number;
};

type ApplicationOptions = {
  http: HttpOptions;
};

export type MongoDBOptions = {
  auth: boolean;
  port: number;
  user: string;
  password: string;
  database: string;
  host: string;
};

export type RedisOptions = {
  auth: boolean;
  port: number;
  user: string;
  password: string;
  database: string;
  host: string;
};

export type ConfigurationOptions = {
  application: ApplicationOptions;
  mongodb: MongoDBOptions;
  redis: RedisOptions;
};
