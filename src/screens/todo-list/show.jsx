import { Input } from "@chakra-ui/input"
import { faCheck, faExclamationCircle } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDraggable } from "./hooks";

const TodoList = ({ todo, onClick }) => {
    const todoIsEmpty = todo?.length === 0
    const [search, setSearch] = useState('')

    const {
        getItemStyle,
        getListStyle,
        onDragEnd,

    } = useDraggable({ todo })

    if (todoIsEmpty) return (
        <div className='an-fade w-full p-3'>
            <span className='text-blue-500 font-bold'>
                Loading...
            </span>
        </div>
    )

    return (
        < div className='an-fade w-full' >
            <Input
                autoComplete='off'
                name='name'
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search Todo'
                className={`border-2 rounded-md mb-3`} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable'>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {
                                todo
                                    ?.filter(item => item?.status !== 2)
                                    ?.filter(item => item?.name?.toLowerCase()?.includes(search?.toLowerCase()))
                                    ?.sort((a, b) => a.status - b.status)
                                    ?.sort((a, b) => {
                                        const aDate = new Date(a.createdAt)
                                        const bDate = new Date(b.createdAt)
                                        return a.status ? (b - a) : (aDate - bDate)
                                    })
                                    ?.map((todoItem, idx) => {
                                        const { name, id, status } = todoItem
                                        return (
                                            <Draggable
                                                key={id} draggableId={id} index={idx}
                                                onClick={() => onClick(id)}
                                                className='w-full border-b-2 mb-3 hover:bg-blue-300 transition-all rounded-md cursor-pointer p-3'>
                                                {(provided, snapshot) => (
                                                    <div
                                                        className='flex justify-between w-full'
                                                        onClick={() => onClick(id)}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        <span>{name}</span>
                                                        <FontAwesomeIcon icon={status ? faCheck : faExclamationCircle} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </div >
    )
}

export default TodoList