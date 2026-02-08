export type StorageType = 'localStorage' | 'sessionStorage';

export interface StorageManagerOptions {
  prefix?: string;
  storageType?: StorageType;
}
