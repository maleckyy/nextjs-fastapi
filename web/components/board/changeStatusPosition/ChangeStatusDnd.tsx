'use client'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { useBoardStore } from '@/store/boardStore/boardStore';
import { Button } from '@/components/ui/button';
import { BoardColumn, UpdateColumnPosition } from '@/types/board/board.type';
import { useUpdateColumnsOrder } from '@/api/board/columns/useUpdateColumnsOrder';
import { createToast } from '@/lib/toastService';

export default function VerticalDragDrop({ closeDialog }: { closeDialog: () => void }) {
  const [items, setItems] = useState<BoardColumn[]>([]);
  const board = useBoardStore((state) => state.board)
  const updateColumnsOrder = useBoardStore((state) => state.updateColumnsOrder)
  const [_, setDraggedEl] = useState<React.ReactNode | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const updateColumnsOrderMutatnion = useUpdateColumnsOrder()

  const onDragEnd = (result: DropResult) => {
    setDraggedEl(null);
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const next = Array.from(items);
    const [moved] = next.splice(source.index, 1);
    next.splice(destination.index, 0, moved);
    setItems(next);
  };

  function saveChanges() {
    const newColsPositions: UpdateColumnPosition[] = items.map((item, index) => ({
      id: item.id,
      position: index,
    }));

    if (isChanged) {
      updateColumnsOrderMutatnion.mutate({ boardId: board!.board.id, cols: newColsPositions }, {
        onSuccess: () => {
          createToast("Status order changed!", "success")
          updateColumnsOrder(newColsPositions)
        },
        onError: () => {
          createToast("Error", "error")
          closeDialog()
        }
      })
    }
  }

  useEffect(() => {
    const changed = items.some((item, index) => item.position !== index);
    setIsChanged(changed);
  }, [items]);

  useEffect(() => {
    if (board) setItems(board.columns)
  }, [board])

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="status" direction="vertical">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-2 min-h-[120px] ${snapshot.isDraggingOver ? 'bg-gray-50' : 'bg-white'}`}
            >
              {board && items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(draggableProvided, draggableSnapshot) => {
                    const element = (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className="flex items-center gap-2 p-2 rounded-md shadow-sm border bg-white cursor-pointer"
                        style={{
                          ...draggableProvided.draggableProps.style,
                          zIndex: draggableSnapshot.isDragging ? 9999 : undefined,
                        }}
                      >
                        <GripVertical size={16} />
                        <span className="small-text-title font-semibold">{index + 1}. {item.name}</span>
                      </div>
                    );

                    if (draggableSnapshot.isDragging) {
                      return ReactDOM.createPortal(element, document.body);
                    }

                    return element;
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className='mt-4 flex flex-row gap-2 justify-end'>
        <Button variant={"destructive"} onClick={closeDialog}>Cancel</Button>
        <Button onClick={saveChanges} disabled={!isChanged}>Save</Button>
      </div>
    </div>
  );
}

