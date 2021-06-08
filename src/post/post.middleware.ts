import { Request, Response, NextFunction } from 'express';
import { POSTS_PER_PAGE } from '../app/app.config';
/**
 *  排序方式
 */
export const sort = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //获取客户端的排序方式
  const { sort } = request.query;

  //排序用的SQL
  let sqlsort: string;

  //设置排序用的SQL
  switch (sort) {
    case 'earliest':
      sqlsort = 'post.id ASC';
      break;
    case 'latest':
      sqlsort = 'post.id DESC';
      break;
    case 'most_comments':
      sqlsort = 'totalComments DESC, post.id DESC';
      break;
    default:
      sqlsort = 'post.id DESC';
      break;
  }

  //在请求中添加排序
  request.sort = sqlsort;

  //下一步
  next();
};

/**
 *  过滤条件
 */
export const filter = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 解构查询符
  const { tag, user, action } = request.query;

  // 设置默认的过滤
  request.filter = {
    name: 'default',
    sql: 'post.id IS NOT NULL',
  };

  //  按标签名过滤
  if (tag && !user && !action) {
    request.filter = {
      name: 'tagName',
      sql: 'tag.name = ?',
      param: tag as string, // user as string 与教程不一样，按照教程会报错，需要强制转换为 string
    };
  }

  // 过滤出用户发布的内容
  if (user && action == 'published' && !tag) {
    request.filter = {
      name: 'userPublished',
      sql: 'user.id = ?',
      param: user as string, // user as string 与教程不一样，按照教程会报错，需要强制转换为 string
    };
  }

  //下一步
  next();
};

/**
 *  内容分页
 */
export const paginate = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //当前页码
  const { page = 1 } = request.query;

  //每页内容数量
  const limit = parseInt(POSTS_PER_PAGE, 10) || 30;

  //计算出偏移量
  const offset = limit * (Number(page) - 1); //Number(page) 需要把page转换成 number，不然会报错

  //设置请求中的分页
  request.pagination = { limit, offset };

  //下一步
  next();
};
