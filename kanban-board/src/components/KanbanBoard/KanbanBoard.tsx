import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ColumnType } from "../../types/kanban";
import Column from "./Column";
import "./kanban.css";
import { v4 as uuid } from "uuid";

const initialData: ColumnType[] = [
  {
    id: "todo",
    title: "Todo",
    color: "blue",
    cards: [
      { id: uuid(), title: "Create initial project plan" },
      { id: uuid(), title: "Design landing page" },
      { id: uuid(), title: "Review codebase structure" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    color: "orange",
    cards: [
      { id: uuid(), title: "Implement authentication" },
      { id: uuid(), title: "Set up database schema" },
      { id: uuid(), title: "Fix navbar bugs" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "green",
    cards: [
      { id: uuid(), title: "Organize project repository" },
      { id: uuid(), title: "Write API documentation" },
    ],
  },
];

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = columns.find(c => c.id === source.droppableId)!;
    const destCol = columns.find(c => c.id === destination.droppableId)!;

    const sourceCards = [...sourceCol.cards];
    const [movedCard] = sourceCards.splice(source.index, 1);

    if (sourceCol.id === destCol.id) {
      sourceCards.splice(destination.index, 0, movedCard);
      setColumns(cols =>
        cols.map(c =>
          c.id === sourceCol.id ? { ...c, cards: sourceCards } : c
        )
      );
    } else {
      const destCards = [...destCol.cards];
      destCards.splice(destination.index, 0, movedCard);

      setColumns(cols =>
        cols.map(c =>
          c.id === sourceCol.id
            ? { ...c, cards: sourceCards }
            : c.id === destCol.id
            ? { ...c, cards: destCards }
            : c
        )
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {columns.map(col => (
          <Column key={col.id} column={col} setColumns={setColumns} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
