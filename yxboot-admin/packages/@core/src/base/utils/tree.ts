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
    map.set(item[idKey], { ...item, [childrenKey]: [] });
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
        if (!parent[childrenKey]) {
          parent[childrenKey] = [];
        }
        parent[childrenKey].push(node);
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
 * 过滤树节点
 * @param tree 树形数据
 * @param predicate 过滤条件
 * @param options 配置项
 * @returns 过滤后的树
 */
export function filterTree<T extends TreeNode>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: {
    childrenKey?: string;
  } = {},
): T[] {
  const { childrenKey = 'children' } = options;

  return tree
    .map((node) => {
      const newNode = { ...node };
      if (newNode[childrenKey] && newNode[childrenKey].length > 0) {
        newNode[childrenKey] = filterTree(newNode[childrenKey], predicate, options);
      }
      return newNode;
    })
    .filter(
      (node) => predicate(node) || (node[childrenKey] && node[childrenKey].length > 0),
    );
}
