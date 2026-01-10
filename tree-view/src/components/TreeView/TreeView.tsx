import { useState } from "react";
import { TreeNode } from "../../types/tree";
import TreeNodeComponent from "./TreeNode";
import "./tree.css";

const initialData: TreeNode[] = [
  { id: "A", name: "Level A", hasChildren: true },
];

const TreeView = () => {
  const [tree, setTree] = useState<TreeNode[]>(initialData);

  return (
    <div className="tree">
      {tree.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          tree={tree}
          setTree={setTree}
          level={0}
        />
      ))}
    </div>
  );
};

export default TreeView;
