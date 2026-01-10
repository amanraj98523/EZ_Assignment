import { TreeNode } from "../types/tree";
import { v4 as uuid } from "uuid";

export const fetchChildren = (): Promise<TreeNode[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: uuid(), name: "Level A", hasChildren: true },
        { id: uuid(), name: "Level A" },
      ]);
    }, 700);
  });
