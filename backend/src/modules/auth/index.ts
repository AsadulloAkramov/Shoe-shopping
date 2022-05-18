import * as Express from 'express';
import { AuthController } from './auth';
import SignIn from './signIn';

const router = Express.Router({mergeParams: true});

router.route('/sign-in')
  .post((req, res) => new SignIn().register(req, res));

router.route('/login')
  .post((req, res) => new AuthController().login(req, res));

router.route('/reset/email')
  .put((req, res) => new AuthController().resetByEmail(req, res))

export default router;
