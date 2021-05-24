import jwt from 'jsonwebtoken';
import { PRIVATE_KEY, PUBLIC_KEY } from '../app/app.config';

/**
 *  签发信息
 */
interface SignTokenOption {
  payload?: any;
}

export const signToken = (options: SignTokenOption) => {
  //准备数据
  const { payload } = options;

  //签发 JWT
  const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });

  //提供数据
  return token;
};
