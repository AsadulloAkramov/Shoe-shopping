import * as Joi from 'joi';

interface ISignIn {
  signIn: Joi.Schema
}
const schema: ISignIn = {
  signIn: Joi.object().keys({
    body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
  })
}

export default schema;
