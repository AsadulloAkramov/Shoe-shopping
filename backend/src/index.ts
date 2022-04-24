import configurations from './config';
import { Application } from './Application';

const app = new Application(configurations);
app.start();

process.on('SIGINT', () => {
  app.shutdown();
});
