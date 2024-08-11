import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../modal'
import { AiFillDelete, AiFillEdit, } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './style.css'
interface Props {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


const SingleTodo = ({ todo, todos, setTodos }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [edit, setedit] = useState<boolean>(false)
    const [editTodo, seteditTodo] = useState<string>(todo.todo)
    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))

    }
    const handleDelete = (id: number) => {
        setTodos(todos.filter((t) => t.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, todo: editTodo } : todo))
        setedit(!edit)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])
    return (
        <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
            {
                edit ? (
                    <input ref={inputRef} value={editTodo} onChange={(e) => seteditTodo(e.target.value)} className='todos__single--text' />
                ) : (
                    todo.isDone ? (
                        <s className="todos__single--text">
                            {todo?.todo}
                        </s>
                    ) : (
                        <span className="todos__single--text">
                            {todo?.todo}
                        </span>
                    )
                )
            }
            <div>
                <span className="icon" onClick={() => {
                    if (!edit && !todo.isDone) {
                        setedit(!edit)
                    }
                }

                }>
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdDone />
                </span>

            </div>
        </form>
    )
}

export default SingleTodo