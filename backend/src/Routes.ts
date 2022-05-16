import * as Express from 'express';
import AuthRoutes from './modules/auth';

const routes = Express.Router({ mergeParams: true });


// Register routes 
routes.use("/auth", AuthRoutes);


export default routes;
