import * as Joi from 'joi'; 

interface IAuth {
  login: Joi.Schema
}

const schema: IAuth = {
  login: Joi.object().keys({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
  })
}

export default schema;