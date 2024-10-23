import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import NotesRoutes from './notes.route';
import swaggerDocs from '../swaggers/openapi.json'
import swaggerUi from 'swagger-ui-express';




/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use('/notes',new NotesRoutes().getRoutes());
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  return router;
};

 

export default routes;
