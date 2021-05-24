import { Request, Response, NextFunction, request } from 'express';

/**
 *  用户登录
 */
export const login = async(
  request: Request,
  response: Response,
  next:NextFunction
) => {
  //准备数据
  const { name, password } = request.body;

  //作出响应
  response.send({ message: `欢迎回来，${name}` });
}