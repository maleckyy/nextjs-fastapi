"use client";
import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { useGlobalDialog } from "@/store/globalDialogContext/globalDialog";
import { useBoardContext } from "@/store/boardContext/boardContext";
import { useGetCurrentBoard } from "@/api/board/currentBoard/useGetCurrentBoard";
import { BoardColumn, BoardOutput, ChangeTaskDestinationRequestBodyType, ColumnCreate, TaskCreateRequest } from "@/types/board/board.type";
import { useAddNewTask } from "@/api/board/boardTask/useAddNewTask";
import BoardColumnAddTaskPopover from "./BoardColumnAddTaskPopover";
import BoardDialogContent from "./boardDialog/BoardDialogContent";
import SingleTaskBox from "./SingleTaskBox";
import { useUpdateTaskPosition } from "@/api/board/boardTask/useUpdateTaskPosition";
import AddNewStatusButton from "./AddNewStatusButton";
import { useAddNewColumn } from "@/api/board/columns/useAddNewColumn";
import { createToast } from "@/lib/toastService";

export default function BoardContent() {
  const {
    removeTaskIdFromParams,
    setTaskIdToParams,
    getTaskIdFromParams,
    boardId,
  } = useBoardContext();

  const [board, setBoard] = useState<BoardOutput>();
  const { open } = useSidebar();
  const { openDialog } = useGlobalDialog(() => {
    removeTaskIdFromParams();
  });

  const { data: boardData, isLoading } = useGetCurrentBoard(boardId)
  const addNewTaskMutatnion = useAddNewTask()
  const updateTaskPositionMutation = useUpdateTaskPosition()
  const addNewColumnMutation = useAddNewColumn()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (!board) return;

    const sourceCol = board.columns.find((col) => col.id === source.droppableId);
    const destCol = board.columns.find(
      (col) => col.id === destination.droppableId
    );
    if (!sourceCol || !destCol) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceItems = [...sourceCol.tasks];
      const destItems = [...destCol.tasks];
      const [moved] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, moved);

      const updated = {
        ...board,
        columns: board.columns.map((col) =>
          col.id === sourceCol.id
            ? { ...col, tasks: sourceItems }
            : col.id === destCol.id
              ? { ...col, tasks: destItems }
              : col
        ),
      };
      setBoard(updated);

      const changeTaskDestinationRequestBody: ChangeTaskDestinationRequestBodyType = {
        boardId: boardId as string,
        taskId: moved.id,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        newTaskPosition: destination.index
      }

      updateTaskPositionMutation.mutate(changeTaskDestinationRequestBody)

    } else {
      const copiedItems = [...sourceCol.tasks];
      const [moved] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, moved);

      const updated = {
        ...board,
        columns: board.columns.map((col) =>
          col.id === sourceCol.id ? { ...col, tasks: copiedItems } : col
        ),
      };
      setBoard(updated);

      const changeTaskDestinationRequestBody: ChangeTaskDestinationRequestBodyType = {
        boardId: boardId as string,
        taskId: moved.id,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        newTaskPosition: destination.index
      }

      updateTaskPositionMutation.mutate(changeTaskDestinationRequestBody)
    }
  };

  function openBoardDialog(taskId: string) {
    openDialog({
      content: <BoardDialogContent taskId={taskId} />,
      dataTestId: `task-content-${taskId}`,
      title: "Task dialog",
      hideTitle: true
    });
  }

  const addNewStatus = useCallback((colName: string) => {
    if (!board) return
    if (colName.trim() === "") return
    const newColData: ColumnCreate = {
      position: board?.columns.length as number,
      board_id: board?.board.id as string,
      name: colName
    }

    addNewColumnMutation.mutate(newColData, {
      onSuccess: (data: BoardColumn) => {
        createToast("Status created!", "success")
        setBoard((prevBoard) => {
          if (!prevBoard) return undefined;
          return {
            ...prevBoard,
            columns: [...prevBoard.columns, data],
          };
        });
      }
    })
  }, [board, addNewColumnMutation])

  useEffect(() => {
    const taskIdFromParams = getTaskIdFromParams();
    if (taskIdFromParams && board) {
      openBoardDialog(taskIdFromParams)
    }
  }, [board]);

  useEffect(() => {
    if (boardData) setBoard(boardData)
  }, [boardData])

  function addTask(colId: string, boardId: string, title: string) {
    if (!title || title.trim() === '') return
    const postData: TaskCreateRequest = {
      taskData: {
        title: title,
        position: board?.columns.find((col) => col.id === colId)?.tasks.length
      },
      columnId: colId,
      boardId: boardId
    }
    addNewTaskMutatnion.mutate(postData, {
      onSuccess: (data) => {
        setBoard((oldTable) => {
          const newTable = { ...oldTable! };
          newTable.columns = oldTable!.columns.map((col) => {
            if (col.id === colId) {
              return {
                ...col,
                tasks: [...col.tasks, data],
              };
            }
            return col;
          });
          return newTable;
        })
      }
    })
  }

  if (!board) {
    return
  }

  if (isLoading) {
    return <p>Loading</p>
  }

  return (
    <div
      className={cn(
        "flex justify-start items-start gap-4 flex-nowrap overflow-x-auto w-full",
        open
          ? "md:max-w-[calc(100vw-223px)]"
          : "md:max-w-[calc(100vw-79px)]"
      )}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {board.columns.map((col) => (
          <Droppable droppableId={col.id.toString()} key={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-[264px] flex-shrink-0 min-h-60 p-4 bg-gray-50 rounded-md"
              >
                <div>
                  <h3 className="small-text-title font-bold mb-4 uppercase">{col.name}</h3>
                </div>
                {col.tasks.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 bg-white rounded shadow"
                        onClick={() => {
                          openBoardDialog(item.id.toString());
                          setTaskIdToParams(item.id.toString());
                        }}
                      >
                        <SingleTaskBox task={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                <BoardColumnAddTaskPopover addTask={addTask} boardId={boardId as string} columnId={col.id} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <AddNewStatusButton addNewStatus={addNewStatus} />
    </div>
  );
}
