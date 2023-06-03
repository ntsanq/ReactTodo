import React from 'react';
import { useNavigate } from "react-router-dom";
import TokenService from "../services/TokenService";
import { Button } from "antd";

function AuthButton(): React.ReactElement {

  const navigate = useNavigate();
  
  const logout = () => {
    TokenService.remove();
    navigate('/login');
  }
  
  if (TokenService.get() !== null) {
    return (
      <div className='logout-button'>
            <Button onClick={logout}>Log out</Button>
      </div>
    );
  }
  
  return <div></div>;
}

export default AuthButton;
