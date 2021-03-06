import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as tagController from './tag.controller';

const router = express.Router();

/**
 * 创建标签
 */
router.post('/tags', authGuard, tagController.store);

/**
 *  导出路由
 */
export default router;
