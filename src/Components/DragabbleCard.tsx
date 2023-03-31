import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toEditorSettings } from "typescript";
import { IToDoState, toDoState } from "../atoms";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

export interface IDraggableProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({ toDoId, toDoText, index, boardId }: IDraggableProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onDelete = () => {
    if (window.confirm(`Do you want to delete ${toDoText} ?`)) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[boardId]];
        const newBoard = boardCopy.filter((td) => td.id !== toDoId);
        return { ...allBoards, [boardId]: newBoard };
      });
    }
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
          <button onClick={onDelete}>X</button>
        </Card>
      )}
    </Draggable>
  );
}

export default DraggableCard;
