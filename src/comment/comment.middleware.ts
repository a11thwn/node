import { Request, Response, NextFunction } from 'express';

/**
 *  过滤器
 */
export const filter = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 解构查询符
  const { post, user, action } = request.query;

  // 默认过滤器
  request.filter = {
    name: 'default',
    sql: 'comment.parentId IS NULL',
  };
  //内容的评论
  if (post && !user && !action) {
    request.filter = {
      name: 'postComment',
      sql: 'comment.parentId IS NULL AND comment.postId = ?',
      param: post as string, // 与教程不同，需要转换post的类型否则会报错
    };
  }

  //用户的评论
  if (user && action == 'published' && !post) {
    request.filter = {
      name: 'userPublished',
      sql: 'comment.parentId IS NULL AND comment.userId = ?',
      param: user as string, // 与教程不同，需要转换post的类型否则会报错
    };
  }

  //用户的回复
  if (user && action == 'replied' && !post) {
    request.filter = {
      name: 'userReplied',
      sql: 'comment.parentId IS NOT NULL AND comment.userId = ?',
      param: user as string, // 与教程不同，需要转换post的类型否则会报错
    };
  }

  // 下一步
  next();
};
