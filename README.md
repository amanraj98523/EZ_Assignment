# React Assignments – Tree View & Kanban Board

This repository contains two React + TypeScript assignments:
1. Tree View Component
2. Kanban Board

Both projects are built with clean component structure, reusable logic, and modern UI patterns.

---

## 🌳 Assignment 1: Tree View Component

### 📌 Objective
Create a fully functional Tree View component similar to a file explorer that displays hierarchical data with support for CRUD operations and lazy loading.

---

### 🚀 Features

- Expand / Collapse Nodes  
  Parent nodes can be expanded or collapsed.  
  Expand icon changes based on the node state.

- Add New Node  
  Users can add child nodes to any parent node.  
  Inline input field is used to enter the node name.

- Edit Node Name  
  Node names can be edited inline.

- Remove Node  
  Any node along with its entire subtree can be deleted.  
  A confirmation dialog is shown before deletion.

- Lazy Loading  
  Child nodes are loaded only when the parent node is expanded.  
  API calls are simulated using mock async functions.

- Clean UI  
  File-explorer style UI with:
  - Vertical dotted hierarchy lines  
  - Horizontal connectors  
  - Circular icons  
  - Card-based layout

---

### 🧱 Component Structure

TreeView  
- TreeNode (recursive)

---

### 📂 Folder Structure (Break-Proof)

```text
tree-view
- public
  - index.html
- src
  - components
    - TreeView
      - TreeView.tsx
      - TreeNode.tsx
      - treeUtils.ts
      - tree.css
  - mock
    - api.ts
  - types
    - tree.ts
  - App.tsx
  - index.tsx
  - index.css
- package.json
- tsconfig.json
- README.md
```

#Deploy link:- https://ez-assignment-n2dx.vercel.app/


# 📋 Assignment 2: Kanban Board

## 📌 Objective
Create a **Kanban Board** with three default columns (**Todo, In Progress, Done**) to manage tasks visually using drag-and-drop interactions.

---

## 🚀 Features

### Default Columns
- Todo
- In Progress
- Done

### Add / Delete Cards
- Users can add new cards to any column.
- Cards can be deleted individually.

### Move Cards Between Columns
- Drag & drop cards across columns.
- Card order is preserved within each column.

### Editable Card Title
- Card titles can be edited inline.
- An edit button is provided next to the card title.
- Changes are saved on **Enter key** or **blur**.

### Responsive Layout
- Desktop: Columns appear side by side.
- Mobile: Columns stack vertically for better usability.

### Clean UI
- Trello-like card design.
- Minimal and modern styling.

---

## 🧱 Component Structure

KanbanBoard  
- Column  
  - Card  

---

## 📂 Folder Structure

```text
kanban-board
- public
  - index.html
- src
  - components
    - KanbanBoard
      - KanbanBoard.tsx
      - Column.tsx
      - Card.tsx
      - kanban.css
  - types
    - kanban.ts
  - App.tsx
  - index.tsx
  - index.css
- package.json
- tsconfig.json
- README.md
```
---
Deploy link:-https://ez-assignment-xi.vercel.app/
---



