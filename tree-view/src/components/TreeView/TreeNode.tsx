


import { useState } from "react";
import { TreeNode } from "../../types/tree";
import { fetchChildren } from "../../mock/api";
import { updateNode, deleteNode } from "./treeUtils";
import { v4 as uuid } from "uuid";




interface Props {
  node: TreeNode;
  tree: TreeNode[];
  setTree: React.Dispatch<React.SetStateAction<TreeNode[]>>;
  level: number;
  isLast?: boolean;
}

const TreeNodeComponent = ({
  node,
  tree,
  setTree,
  level,
  isLast = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState(node.name);
  const [newName, setNewName] = useState("");

  
  const toggle = async () => {
    if (!open && node.hasChildren && !node.children) {
      const children = await fetchChildren();
      setTree((t) =>
        updateNode(t, node.id, (n) => ({ ...n, children }))
      );
    }
    setOpen(!open);
  }

  const addNode = () => {
    if (!newName.trim()) {
      setAdding(false);
      return;
    }

    setTree((t) =>
      updateNode(t, node.id, (n) => ({
        ...n,
        children: [
          ...(n.children || []),
          { id: uuid(), name: newName },
        ],
      }))
    );

    setNewName("");
    setAdding(false);
    setOpen(true);
  };

  
  const remove = () => {
    if (window.confirm("Delete this node and its subtree?")) {
      setTree((t) => deleteNode(t, node.id));
    }
  };

  
  const saveEdit = () => {
    if (!value.trim()) return;
    setTree((t) =>
      updateNode(t, node.id, (n) => ({ ...n, name: value }))
    );
    setEditing(false);
  };

  return (
    <>
      <div
        className={`tree-node ${isLast ? "last-node" : ""}`}
        style={{ marginLeft: level * 48 }}
      >
      
        <span className="vertical-line" />

      
        <span className="horizontal-line" />

        
        <div className="node-card">
          {node.hasChildren && (
            <span className="toggle" onClick={toggle}>
              {open ? "−" : "+"}
            </span>
          )}

          <div className={`circle ${level === 0 ? "root" : ""}`}>
            {node.name.charAt(0).toUpperCase()}
          </div>

          {editing ? (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              autoFocus
            />
          ) : (
            <span
              className="node-text"
              onDoubleClick={() => setEditing(true)}
            >
              {node.name}
            </span>
          )}

          <button className="add-btn" onClick={() => setAdding(true)}>
            +
          </button>

          <button className="delete-btn" onClick={remove}>
            🗑
          </button>
        </div>
      </div>

      
      {adding && (
        <input
          className="add-input"
          placeholder="Enter node name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={addNode}
          onKeyDown={(e) => e.key === "Enter" && addNode()}
          autoFocus
        />
      )}

    
      {open &&
        node.children?.map((child, index) => (
          <TreeNodeComponent
            key={child.id}
            node={child}
            tree={tree}
            setTree={setTree}
            level={level + 1}
            isLast={index === node.children!.length - 1}
          />
        ))}
    </>
  );
};

export default TreeNodeComponent;
