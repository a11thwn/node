import express from 'express';
import * as userController from './user.controller';
import {
  hashPassword,
  validateUserData,
  validateUpdateUserData,
} from './user.middleware';
import { authGuard } from '../auth/auth.middleware';

const router = express.Router();

/**
 *  创建用户
 */
router.post('/users', validateUserData, hashPassword, userController.store);

/**
 *  创建用户
 */
router.get('/users/:userId', userController.show);

/**
 *  创建用户
 */
router.patch(
  '/users',
  authGuard,
  validateUpdateUserData,
  userController.update,
);

/**
 *  导出路由
 */
export default router;
