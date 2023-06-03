import React, { useState } from "react";
import { Input, Button } from 'antd';

interface TodoFormProps {
  onSubmit: (value: string) => void
}

function AddForm(props: TodoFormProps): React.ReactElement {
  const [input, setInput] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(input);
    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add a task"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
      />

      <Button className="todo-button" type="primary" htmlType='submit'>Add</Button>
    </form>
  );
}

export default AddForm;
