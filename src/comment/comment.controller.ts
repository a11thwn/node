import { Request, Response, NextFunction } from 'express';
import { createPostTag } from '../post/post.service';
import { createComment, isReplyComment } from './comment.service';

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
