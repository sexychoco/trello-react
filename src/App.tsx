import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import Board from "./Components/Board";
import { toDoState } from "./atoms";
import { useRecoilState } from "recoil";
import getClock from "./Components/clock";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  display: flex;
  gap: 2rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination?.droppableId == source.droppableId) {
      setToDos((allBoards) => {
        const boardcopy = [...allBoards[source.droppableId]];
        const taskObj = boardcopy[source.index];
        boardcopy.splice(source.index, 1);
        boardcopy.splice(destination?.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: boardcopy };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.index]: sourceBoard,
          [destination.index]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
