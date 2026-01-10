import { TreeNode } from "../../types/tree";

export const updateNode = (
  nodes: TreeNode[],
  id: string,
  updater: (n: TreeNode) => TreeNode
): TreeNode[] =>
  nodes.map((node) =>
    node.id === id
      ? updater(node)
      : {
          ...node,
          children: node.children
            ? updateNode(node.children, id, updater)
            : node.children,
        }
  );

export const deleteNode = (nodes: TreeNode[], id: string): TreeNode[] =>
  nodes
    .filter((n) => n.id !== id)
    .map((n) => ({
      ...n,
      children: n.children ? deleteNode(n.children, id) : undefined,
    }));
