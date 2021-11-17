import { useColorMode } from "@chakra-ui/color-mode"
import { faArrowLeft, faLightbulb, faPowerOff } from "@fortawesome/fontawesome-free-solid"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { sagaActions } from "../../stores/actions/saga"
import { getTodo, createNewTodo, updateTodo, reorderTodo } from "../../stores/reducers/todo"
import store from "../../stores/store"

export const useTodoList = () => {
    const todo = useSelector(getTodo)
    const [tab, setTab] = useState('list')
    const [activeTodo, setActiveTodo] = useState()
    const showBackIcon = tab === 'edit' || tab === 'create'
    const showCreateIcon = tab === 'list'

    useEffect(() => {
        store.dispatch(({ type: sagaActions.FETCH_DATA_SAGA }))

    }, [])

    const navigateToListHandler = useCallback((index) => {
        setTab('list')
    }, [])

    const navigateToEditHandler = useCallback((index) => {
        setActiveTodo(index)
        setTab('edit')
    }, [])

    const navigateToCreateHandler = useCallback((index) => {
        setActiveTodo()
        setTab('create')
    }, [])


    const { colorMode, toggleColorMode } = useColorMode()


    const lightIcon = (colorMode === 'dark' ? faLightbulb : faPowerOff)
    const icon = showBackIcon ? faArrowLeft : lightIcon

    return {
        todo,
        tab,
        setTab,
        activeTodo,
        setActiveTodo,
        showBackIcon,
        showCreateIcon,
        navigateToCreateHandler,
        navigateToEditHandler,
        navigateToListHandler,
        toggleColorMode,
        icon
    }
}

export const useTodoCreate = ({ todo, activeTodo, navigateToListHandler }) => {
    const item = todo?.filter(data => data.id === activeTodo)[0]
    const [create, setCreate] = useState({
        name: item?.name || '',
        description: item?.description || '',
        id: item?.id || `item-${todo?.length + 1}`,
        oriId: item?.oriId || todo?.length + 1,
        status: item?.status || 0,
        createdAt: item?.createdAt || new Date()
    })

    const createHandler = useCallback((e) => {

        if (!e?.target) {
            setCreate(current => ({ ...current, createdAt: e }))
            return
        }

        const { name, value, selectedOptions } = e?.target
        let val = ''
        if (name === 'status') val = Number(selectedOptions[0].value)
        else val = value
        console.log(val);
        setCreate(current => ({ ...current, [name]: val }))
    }, [])

    const {
        name,
        description,
        nameIsRequired,
        descriptionIsRequired,
        status,
        createdAt
    } = create

    const validate = () => {
        let required = false
        if (!name || !description) {
            if (!name) setCreate(current => ({ ...current, nameIsRequired: true }))
            else setCreate(current => ({ ...current, nameIsRequired: false }))
            if (!description) setCreate(current => ({ ...current, descriptionIsRequired: true }))
            else setCreate(current => ({ ...current, nameIsRequired: false }))
            required = true
        }
        else required = false
        if (!required) {
            !item && store.dispatch(createNewTodo(create))
            item && store.dispatch(updateTodo(create))
            navigateToListHandler()
        }
    }

    return {
        create,
        setCreate,
        createHandler,
        name,
        description,
        status,
        createdAt,
        nameIsRequired,
        descriptionIsRequired,
        validate
    }
}

export const useDraggable = ({ todo }) => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    const getListStyle = isDraggingOver => ({
        transition: 'all ease 0.3s',
        background: isDraggingOver ? "#3B81F6" : "lightgrey",
        padding: grid,
        width: '100%',
        borderRadius: '7px'
    });

    const getItemStyle = (isDragging, draggableStyle) => ({
        transition: 'all ease 0.3s',
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        color: isDragging && isDark && '#3B81F6',
        background: isDragging ? "lightgrey" : (isDark ? '#3B81F6' : "white"),
        borderRadius: '7px',
        ...draggableStyle
    });

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const grid = 8;

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = reorder(
            todo,
            result.source.index,
            result.destination.index
        );
        store.dispatch(reorderTodo(items))
    }

    return {
        getItemStyle,
        getListStyle,
        onDragEnd,
    }
}