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
  const onEdit = () => {
    const newToDoText = window
      .prompt(`${toDoText} 할 일의 새 이름을 입력해주세요.`, toDoText)
      ?.trim();
    if (newToDoText !== null && newToDoText !== undefined) {
      if (newToDoText == "") {
        alert("업무를 입력해주세요");
        return;
      }
      setToDos((allBoards) => {
        const newToDo = {
          id: toDoId,
          text: newToDoText,
        };
        const boardCopy = [...allBoards[boardId]];
        boardCopy.splice(index, 1);
        boardCopy.splice(index, 0, newToDo);
        return { ...allBoards, [boardId]: boardCopy };
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
          <button onClick={onEdit}>Edit</button>
        </Card>
      )}
    </Draggable>
  );
}

export default DraggableCard;
