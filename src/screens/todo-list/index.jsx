import { faPlus } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TodoCreate from "./create";
import { useTodoList } from "./hooks";
import TodoList from "./show";

export default function Todo() {
    const {
        todo,
        tab,
        setTab,
        activeTodo,
        showBackIcon,
        showCreateIcon,
        navigateToCreateHandler,
        navigateToEditHandler,
        navigateToListHandler,
        toggleColorMode,
        icon,
        setTodo,
    } = useTodoList()

    return (
        <div className=''>
            <div className='p-3 font-bold text-white bg-blue-500 rounded-md w-full flex justify-between items-center'>
                <FontAwesomeIcon
                    onClick={() => showBackIcon ? setTab('list') : toggleColorMode()}
                    className={`cursor-pointer`}
                    icon={icon} />
                <span>Todo List</span>
                <FontAwesomeIcon
                    onClick={() => showCreateIcon && navigateToCreateHandler()}
                    className={`${showCreateIcon ? 'cursor-pointer' : 'text-transparent'}`}
                    icon={faPlus} />
            </div>
            <br />
            {tab === 'list' && <TodoList
                todo={todo}
                onClick={navigateToEditHandler}
                setTodo={setTodo} />}
            {(tab === 'create' || tab === 'edit') && <TodoCreate
                todo={todo}
                activeTodo={activeTodo}
                navigateToListHandler={navigateToListHandler} />}
        </div>
    )

}