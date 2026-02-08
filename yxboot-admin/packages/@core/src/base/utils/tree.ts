/**
 * 树形结构工具函数
 */

interface TreeNode {
  id: string | number;
  parentId?: string | number | null;
  children?: TreeNode[];
  [key: string]: any;
}

/**
 * 列表转树形结构
 * @param list 列表数据
 * @param options 配置项
 * @returns 树形数据
 */
export function listToTree<T extends TreeNode>(
  list: T[],
  options: {
    idKey?: string;
    parentIdKey?: string;
    childrenKey?: string;
    rootValue?: any;
  } = {},
): T[] {
  const {
    idKey = 'id',
    parentIdKey = 'parentId',
    childrenKey = 'children',
    rootValue = null,
  } = options;

  const tree: T[] = [];
  const map = new Map<string | number, T>();

  // 创建映射
  list.forEach((item) => {
    const key = item[idKey as keyof T];
    map.set(key as string | number, { ...item, [childrenKey]: [] } as T);
  });

  // 构建树
  list.forEach((item) => {
    const node = map.get(item[idKey])!;
    const parentId = item[parentIdKey];

    if (parentId === rootValue || parentId === undefined || parentId === '') {
      tree.push(node);
    } else {
      const parent = map.get(parentId);
      if (parent) {
        const p = parent as Record<string, any>;
        if (!p[childrenKey]) {
          p[childrenKey] = [];
        }
        p[childrenKey].push(node);
      }
    }
  });

  return tree;
}

/**
 * 树形结构转列表
 * @param tree 树形数据
 * @param options 配置项
 * @returns 列表数据
 */
export function treeToList<T extends TreeNode>(
  tree: T[],
  options: {
    childrenKey?: string;
  } = {},
): T[] {
  const { childrenKey = 'children' } = options;
  const list: T[] = [];

  function traverse(nodes: T[]) {
    nodes.forEach((node) => {
      const { [childrenKey]: children, ...rest } = node;
      list.push(rest as T);
      if (children && children.length > 0) {
        traverse(children);
      }
    });
  }

  traverse(tree);
  return list;
}

/**
 * 查找树节点
 * @param tree 树形数据
 * @param predicate 查找条件
 * @param options 配置项
 * @returns 找到的节点
 */
export function findTreeNode<T extends TreeNode>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: {
    childrenKey?: string;
  } = {},
): T | undefined {
  const { childrenKey = 'children' } = options;

  for (const node of tree) {
    if (predicate(node)) {
      return node;
    }
    if (node[childrenKey] && node[childrenKey].length > 0) {
      const found = findTreeNode(node[childrenKey], predicate, options);
      if (found) {
        return found;
      }
    }
  }

  return undefined;
}

/**
 * 过滤树节点（保留满足条件的节点，并递归过滤其子节点）
 * 适用于任意带 children 的树结构（如 RouteRecordRaw、MenuRecordRaw）
 */
export function filterTree<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: {
    childrenKey?: string;
  } = {},
): T[] {
  const { childrenKey = 'children' } = options;

  return tree
    .filter((node) => predicate(node))
    .map((node) => {
      const newNode = { ...node } as T;
      const children = newNode[childrenKey];
      if (children && Array.isArray(children) && children.length > 0) {
        (newNode as Record<string, unknown>)[childrenKey] = filterTree(
          children as T[],
          predicate,
          options,
        );
      }
      return newNode;
    });
}

/**
 * 映射树节点
 * 适用于任意带 children 的树结构
 */
export function mapTree<T extends Record<string, any>, V extends Record<string, any>>(
  tree: T[],
  mapper: (node: T) => V,
  options: {
    childrenKey?: string;
  } = {},
): V[] {
  const { childrenKey = 'children' } = options;

  return tree.map((node) => {
    const mapped = mapper(node) as V & Record<string, unknown>;
    const childNodes = (node as Record<string, unknown>)[childrenKey];
    if (Array.isArray(childNodes) && childNodes.length > 0) {
      (mapped as Record<string, unknown>)[childrenKey] = mapTree(
        childNodes as T[],
        mapper,
        options,
      );
    }
    return mapped as V;
  });
}

/**
 * 对树形结构递归排序
 */
export function sortTree<T extends Record<string, any>>(
  tree: T[],
  compare: (a: T, b: T) => number,
  options: {
    childrenKey?: string;
  } = {},
): T[] {
  const { childrenKey = 'children' } = options;

  return [...tree]
    .sort(compare)
    .map((node) => {
      const newNode = { ...node } as T;
      const children = newNode[childrenKey];
      if (children && Array.isArray(children) && children.length > 0) {
        (newNode as Record<string, unknown>)[childrenKey] = sortTree(
          children as T[],
          compare,
          options,
        );
      }
      return newNode;
    });
}
