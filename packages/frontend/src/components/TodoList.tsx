import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import EditForm from "./EditForm";
import { Todo } from "../types/TodoType";
import { Checkbox, Button, Popconfirm, List, Typography, Drawer } from "antd";

const {Text} = Typography;

interface TodoProps {
  editTodo: (id: string, text: string, is_complete: boolean) => void,
  removeTodo: (id: string) => void,
  todos: Todo[]
}

function TodoList(props: TodoProps): React.ReactElement {
  const {editTodo, removeTodo, todos} = props

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Todo>({
    id: '',
    text: '',
    is_complete: false
  });

  const submitUpdate = (value: string) => {
    editTodo(edit.id, value, edit.is_complete);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        bordered
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item>
            <Checkbox name="checkbox" onClick={() => editTodo(todo.id, todo.text, (!todo.is_complete))} checked={todo.is_complete}
            >
              {
                todo.is_complete
                  ?
                  <Text delete>
                    {todo.text}
                  </Text>
                  :
                  <Text>
                    {todo.text}
                  </Text>
              }
            </Checkbox>
            <div className="icons">
              <Button icon={<AiFillEdit/>} onClick={() => {
                setEdit({id: todo.id, text: todo.text, is_complete: todo.is_complete});
                setOpen(true);
              }}/>
              <Popconfirm title="Delete?" onConfirm={() => removeTodo(todo.id)}>
                <Button icon={<AiOutlineDelete/>}/>
              </Popconfirm>
            </div>
          </List.Item>
        )}
      />

      <Drawer title="Edit your task" placement="right" onClose={onClose} open={open}>
        <EditForm edit={edit} onSubmit={submitUpdate}/>
      </Drawer>
    </>

  )
}

export default TodoList;
