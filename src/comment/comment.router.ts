import express from 'express';
import { filter } from './comment.middleware';
import { accesscontrol, authGuard } from '../auth/auth.middleware';
import * as commentController from './comment.controller';
import { paginate } from '../post/post.middleware';
import { COMMENTS_PER_PAGE } from '../app/app.config';

const router = express.Router();

/**
 *  发表评论
 */
router.post('/comments', authGuard, commentController.store);

/**
 *  回复评论
 */
router.post('/comments/:commentId/reply', authGuard, commentController.reply);

/**
 *  更新评论
 */
router.patch(
  '/comments/:commentId',
  authGuard,
  accesscontrol({ possession: true }),
  commentController.update,
);

/**
 *  删除评论
 */
router.delete(
  '/comments/:commentId',
  authGuard,
  accesscontrol({ possession: true }),
  commentController.destroy,
);

/**
 *  评论列表
 */
router.get(
  '/comments',
  filter,
  paginate(COMMENTS_PER_PAGE),
  commentController.index,
);

/**
 *  导出路由
 */
export default router;
