import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Select } from "@chakra-ui/react"
import { Textarea } from "@chakra-ui/textarea"
import { useTodoCreate } from "./hooks"

const TodoCreate = ({
    todo,
    activeTodo,
    navigateToListHandler
}) => {
    const {
        createHandler,
        name,
        description,
        status,
        nameIsRequired,
        descriptionIsRequired,
        validate
    } = useTodoCreate({
        todo,
        activeTodo,
        navigateToListHandler
    })

    return (
        <div className='an-fade w-full'>
            <Input
                autoComplete='off'
                style={{ borderColor: nameIsRequired && 'red' }}
                defaultValue={name}
                name='name'
                onChange={createHandler}
                placeholder='Input Todo'
                className={`border-2 rounded-md mb-3`} />
            <Textarea
                autoComplete='off'
                style={{ borderColor: descriptionIsRequired && 'red' }}
                defaultValue={description}
                onChange={createHandler}
                name='description'
                placeholder='Input description'
                className='mb-3' />
            <Select
                name='status'
                defaultValue={status}
                onChange={createHandler} >
                <option value={0}>On Going</option>
                <option value={1}>Done</option>
                <option className={`${status === 1 && 'hidden'}`} value={2}>Delete Todo</option>
            </Select>
            <Button
                onClick={() => validate()}
                className='mt-3'>
                Done
            </Button>
        </div>
    )
}

export default TodoCreate