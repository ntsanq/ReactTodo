import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { Todo } from "../types/TodoType";

interface EditFormProps {
  onSubmit: (value: string) => void,
  edit: Todo
}

function EditForm(props: EditFormProps): React.ReactElement {
  const [input, setInput] = useState(props?.edit?.text);

  useEffect(() => {
    setInput(props.edit.text);
  }, [props.onSubmit])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(input);
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
      />
      <Button className="edit-button" type="primary" htmlType='submit'>Update</Button>
    </form>
  );
}

export default EditForm;
