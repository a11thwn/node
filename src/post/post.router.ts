import express from 'express';
import * as postController from './post.controller';
import { authGuard, accesscontrol } from '../auth/auth.middleware';
import { filter, paginate, sort } from './post.middleware';

const router = express.Router();

/**
 *  内容列表
 */
router.get('/posts', sort, filter, paginate, postController.index);

/**
 *  创建内容
 */
router.post('/posts', authGuard, postController.store);

/**
 *  更新内容
 */
router.patch(
  '/posts/:postId',
  authGuard,
  accesscontrol({ possession: true }),
  postController.update,
);

/**
 *  删除内容
 */
router.delete(
  '/posts/:postId',
  authGuard,
  accesscontrol({ possession: true }),
  postController.destroy,
);

/**
 *  添加内容标签
 */
router.post(
  '/posts/:postId/tag',
  authGuard,
  accesscontrol({ possession: true }),
  postController.storePostTag,
);

/**
 *  添加内容标签
 */
router.delete(
  '/posts/:postId/tag',
  authGuard,
  accesscontrol({ possession: true }),
  postController.destroyPostTag,
);

/**
 *  导出路由
 */
export default router;
