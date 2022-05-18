import * as AsyncRedis from 'redis';

export class RedisDriver {
  private client: any;
  private static redisInstance: RedisDriver;

  private constructor() {
    try{
      this.connection();
      console.log(`Connected to Redis`);
    }
    catch(err) {
      console.error(`Redis Module error: ${err}`);
    }
  }

  public static getInstance(): RedisDriver {
    if(!RedisDriver.redisInstance) {
      RedisDriver.redisInstance = new RedisDriver();
    }
    return RedisDriver.redisInstance;
  }

  private async connection() {
    this.client =  AsyncRedis.createClient();
  }

  public async set(
    key: string,
    value: string,
    duration: number = 900,
    mode: string ="EX"
  ) {
    return await this.client.set(key, value, mode, duration)
  }

  public async get(key: string) {
    return await this.client.get(key);
  }

  public async del(key: string) {
    return await this.client.del(key);
  }
}