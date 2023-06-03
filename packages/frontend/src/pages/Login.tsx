import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import TokenService from "../services/TokenService";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import TodoService from "../services/TodoService";

function Login(): React.ReactElement {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
     TodoService.getAll().then(r => {
       if (r.success === true) {
         navigate('/')
       }
     }).catch(e => {
       if (e.response.status == 401) {
         //
       }
     });
  },[]);

  function handleInputChange(e: any) {
    const {id, value} = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  }

  const handleSubmit = () => {
    if (email == '' || password == '') {
      return;
    } else {
      postLogin();
    }
  }

  const postLogin = () => {
    AuthService.login(email, password).then(r => {
      if (r.success) {
        TokenService.set(r.data.token);
        navigate("/");
      }
      return;
    }).catch((e) => {
      message.error(e.response.data.message)
    });
  }

  return (
    <>
      <div className='auth-form'>
        <Form
          name="basic"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          initialValues={{remember: true}}
          autoComplete="off"
        >

          <h1 style={{textAlign: 'center', paddingLeft: '7rem'}}>Login</h1>

          <Form.Item
            label="Email"
            name="email"
            rules={[{required: true, message: 'Please input your email!'}]}
          >
            <Input id="email" onChange={(e) => handleInputChange(e)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password id="password" onChange={(e) => handleInputChange(e)} />
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <a href='/register'>
              Don't have a account?
            </a>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
