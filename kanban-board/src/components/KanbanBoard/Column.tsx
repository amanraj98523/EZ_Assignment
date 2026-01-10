import { Droppable } from "@hello-pangea/dnd";
import { ColumnType } from "../../types/kanban";
import Card from "./Card";
import { v4 as uuid } from "uuid";

interface Props {
  column: ColumnType;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

const Column = ({ column, setColumns }: Props) => {
  const addCard = () => {
    const title = prompt("Enter card title");
    if (!title) return;

    setColumns(cols =>
      cols.map(c =>
        c.id === column.id
          ? { ...c, cards: [...c.cards, { id: uuid(), title }] }
          : c
      )
    );
  };

  return (
    <div className="column">
      <div className={`column-header ${column.color}`}>
        <span>{column.title}</span>
        <span className="count">{column.cards.length}</span>
        <button onClick={addCard}>+</button>
      </div>

      <button className="add-card" onClick={addCard}>
        + Add Card
      </button>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                columnId={column.id}
                setColumns={setColumns}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
