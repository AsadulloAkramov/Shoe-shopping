import * as JWT from 'jsonwebtoken';

export class JwtService {
  async sign(payload: any) {
    return await JWT.sign(payload, process.env.JWT_SECRET , {
      expiresIn: process.env.JWT_EXPIRE
    })
  }

  async verify(token: any) {
    return await JWT.verify(token, process.env.JWT_SECRET);
  }

  async decode(token: any) {
    return await JWT.decode(token);
  }
}