import { Request, Response, NextFunction } from 'express';
import {
  createComment,
  isReplyComment,
  updateComment,
  deleteComment,
  getComments,
  getcommentsTotalCount,
} from './comment.service';
import { filter } from './comment.middleware';
/**
 *  发表评论
 */
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { id: userId } = request.user;
  const { content, postId } = request.body;

  const comment = {
    userId,
    postId,
    content,
  };

  try {
    //保存评论
    const data = await createComment(comment);

    //作出响应
    response.sendStatus(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 *  回复评论
 */
export const reply = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { commentId } = request.params;
  const parentId = parseInt(commentId, 10);
  const { id: userId } = request.user;
  const { content, postId } = request.body;

  const comment = {
    content,
    postId,
    userId,
    parentId,
  };

  try {
    //检查评论是否为回复评论
    const reply = await isReplyComment(parentId);
    if (reply) return next(new Error('UNABLE_TO_REPLY_THIS_COMMENT'));
  } catch (error) {
    next(error);
  }
  try {
    // 回复评论
    const data = await createComment(comment);

    //作出响应
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 *  修改评论
 */
export const update = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { commentId } = request.params;
  const { content } = request.body;

  const comment = {
    id: parseInt(commentId, 10),
    content,
  };
  try {
    //修改评论
    const data = await updateComment(comment);

    //作出响应
    response.send(data);
  } catch (error) {
    next(error);
  }
};

/**
 *  删除评论
 */
export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { commentId } = request.params;

  try {
    //删除评论
    const data = await deleteComment(parseInt(commentId, 10));

    //作出响应
    response.send(data);
  } catch (error) {}
};

/**
 *  评论列表
 */
export const index = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //统计评论数量
  try {
    const totalCount = await getcommentsTotalCount({ filter: request.filter });

    // 设置响应头部
    response.header('X-Total-Count', totalCount);
  } catch (error) {
    next();
  }
  // 获取评论列表
  try {
    const commnets = await getComments({
      filter: request.filter,
      pagination: request.pagination,
    });

    //作出响应
    response.send(commnets);
  } catch (error) {
    next(error);
  }
};
