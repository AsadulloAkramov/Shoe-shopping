import Express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { MongoDriver } from './infra/mongo/driver';
import routes from './Routes';
import mongoose from 'mongoose';

export class Application {
  public mongoUrl: string;
  public port: number;
  public server;
  public expressServer;

  constructor(configuration) {
    this.mongoUrl = configuration.mongodb.database;
    this.port = configuration.application.http.port;
  }

  async start() {
    try {
      await this.dbConnect();
      await this.startExpress();
    } catch (e) {}
  }

  async dbConnect() {
    const mongo = new MongoDriver();
    await mongo.connect();
  }

  async startExpress() {
    let corsOptions = {
      origin: '*',
      methods: 'GET,PUT,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization', 'Lang'],
      preflightContinue: false,
      optionsSuccessStatus: 204
    };
    this.server = Express();
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json({ limit: '50mb' }));
    this.server.use(cors(corsOptions));
    this.server.use(routes);
    this.expressServer = this.server.listen(this.port, console.log(`Server listening on port ${this.port}...`));
    console.log('app port: ', this.port);
  }

  shutdown = async () => {
    try {
      await mongoose.connection.close();
      await this.expressServer.close();
      process.exit(0);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };
}
