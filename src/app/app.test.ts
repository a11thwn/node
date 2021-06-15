import { greet } from './playground/demo';

/**
 *  单元测试
 */
describe('演示单元测试', () => {
  // 测试
  test('测试 greet 函数', () => {
    // 准备
    const greeting = greet('壬寅');

    //断言
    expect(greeting).toBe('你好，壬寅');
  });
});
