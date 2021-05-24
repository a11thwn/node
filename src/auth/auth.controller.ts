import { Request, Response, NextFunction, request } from 'express';
import { signToken } from './auth.service';

/**
 *  用户登录
 */
export const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { id, name } = request.body;

  const payload = { id, name };

  try {
    //签发令牌
    const token = signToken({ payload });

    //作出响应
    response.send({ id, name, token });
  } catch (error) {
    next(error);
  }
};
