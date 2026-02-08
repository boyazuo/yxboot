/**
 * Store 相关类型
 */

/** 可持久化的 Store 配置 */
export interface PersistOptions {
  /** 存储键名 */
  key?: string;
  /** 要持久化的 state 键列表 */
  pick?: string[];
  /** 存储方式 */
  storage?: Storage;
}
