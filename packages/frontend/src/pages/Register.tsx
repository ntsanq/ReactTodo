import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import TokenService from "../services/TokenService";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";


function Register(): React.ReactElement {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  function handleInputChange(e: any) {
    const {id, value} = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "name") {
      setName(value);
    }
  }

  const handleSubmit = () => {
    if (email == '' || password == '' || name == '') {
      return;
    } else {
      postRegister();
    }
  }

  const navigate = useNavigate();

  const postRegister = () => {
    AuthService.register(name, email, password).then(r => {
      if (r.success) {
        TokenService.set(r.data.token);
        navigate("/");
      }
      return;
    }).catch((err) => {
      message.error(err.response.data.message)
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

          <h1 style={{textAlign: 'center', paddingLeft: '7rem'}}>Sign up</h1>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {required: true, message: 'Please input your name!'},
            ]}
          >
            <Input id="name" onChange={(e) => handleInputChange(e)}/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {type: 'email', message: 'This email is not valid!'},
              {required: true, message: 'Please input your email!'},
            ]}
          >
            <Input id="email" onChange={(e) => handleInputChange(e)}/>
          </Form.Item>


          <Form.Item
            name="password"
            label="Password"
            rules={[
              {required: true, message: 'Please input your password!'},
            ]}
            hasFeedback
          >
            <Input.Password id="password" onChange={(e) => handleInputChange(e)}/>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {required: true, message: 'Please confirm your password!'},

              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Register;
