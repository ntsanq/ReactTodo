import React, { useEffect, useState } from 'react';
import AddForm from "./AddForm";
import TodoList from "./TodoList";
import TodoService from "../services/TodoService";
import { Todo } from "../types/TodoType";
import TodoMessage from "../messages/TodoMessage";
import { useNavigate } from "react-router-dom";
import TokenService from "../services/TokenService";

function TodoBoard(): React.ReactElement {
  const [todos, setTodos] = useState<Todo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    TodoService.getAll().then(r => {
      if (r.success) {
        setTodos(r.data);
      }
    }).catch(e => {
      if (e.response.status === 401) {
        navigate('/login')
      }
    });
  }, [TokenService.get()]);

  const addTodo = (value: string) => {
    if (/^\s*$/.test(value)) return;
    TodoService.add(value).then(r => {
      if (r.success) {
        let todo = {
          id: r.data.id,
          text: r.data.text,
          is_complete: r.data.is_complete
        }
        setTodos([...todos, todo]);
        TodoMessage.addSuccess();
      } else {
        TodoMessage.addFailed();
      }
    });
  }

  const editTodo = (id: string, newValue: string, is_complete: boolean) => {
    TodoService.edit(id, newValue, is_complete).then(r => {
      if (r.success) {
        r.data.id = r.data.id.toString();
        const updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            return {
              id: r.data.id,
              text: r.data.text,
              is_complete: r.data.is_complete
            };
          }
          return todo;
        });
        setTodos(updatedTodos);
        TodoMessage.updateSuccess();
      } else {
        TodoMessage.updateFailed();
      }
    });
  };
  

  const removeTodo = (id: string) => {
    TodoService.remove(id).then(r => {
      if (r.success) {
        setTodos(todos.filter(todo => todo.id !== id));
        TodoMessage.deleteSuccess();
      } else {
        TodoMessage.deleteFailed();
      }
    })
  }

  return (
    <>
      <div className='todo-board'>
        <h3>What's your plan today?</h3>
        <AddForm onSubmit={addTodo} />
        <TodoList todos={todos} editTodo={editTodo} removeTodo={removeTodo}/>
      </div>
    </>
  )
}

export default TodoBoard
