import { Draggable } from "@hello-pangea/dnd";
import { CardType } from "../../types/kanban";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";

interface Props {
  card: CardType;
  index: number;
  columnId: string;
  setColumns: React.Dispatch<React.SetStateAction<any>>;
}

const Card = ({ card, index, columnId, setColumns }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  
  const saveTitle = () => {
    if (!title.trim()) {
      setTitle(card.title);
      setIsEditing(false);
      return;
    }

    setColumns((cols: any[]) =>
      cols.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((c: any) =>
                c.id === card.id ? { ...c, title } : c
              ),
            }
          : col
      )
    );

    setIsEditing(false);
  };

  
  const deleteCard = () => {
    setColumns((cols: any[]) =>
      cols.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c: any) => c.id !== card.id) }
          : col
      )
    );
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
  
          {isEditing ? (
            <input
              className="card-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={saveTitle}
              onKeyDown={(e) => e.key === "Enter" && saveTitle()}
              autoFocus
            />
          ) : (
            <span className="card-title">{card.title}</span>
          )}

      
          <div className="card-actions">
            <button
              className="icon-btn"
              onClick={() => setIsEditing(true)}
              title="Edit"
            >
              <Pencil size={16} />
            </button>

            <button
              className="icon-btn delete"
              onClick={deleteCard}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
