import * as Express from 'express';
import * as swaggerUi from 'swagger-ui-express';

function nestedRoutes(path, configure) {
  const router = Express.Router({ mergeParams: true });
  this.use(path, router);
  configure(router);
  return router;
}

Express.application['prefix'] = nestedRoutes;
Express.Router['prefix'] = nestedRoutes;

const routes = Express.Router({ mergeParams: true });

export default routes;
