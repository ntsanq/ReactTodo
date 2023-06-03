import React from 'react';
import TodoBoard from "../components/TodoBoard";
import AuthButton from "../components/AuthButton";

function Home(): React.ReactElement {
  return (
    <div>
      <AuthButton />
      <h1 className="App">
        <TodoBoard />
      </h1>
    </div>
  );
}

export default Home;
