import { Button, Card, Checkbox, Form, Input } from 'antd'
import { Typography } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F7F8FB" , padding: "40px" }}>
      <Card bordered={false} style={{ width: "500px", margin: "auto" }}>
        <Title level={3} style={{ textAlign: "center", fontWeight: 500, marginBottom: "40px" }}>
          Sign In to SimpleChat
        </Title>
        <Form
          name="basic"
          style={{
            maxWidth: 500,
          }}
          initialValues={{
            remember: true,
          }}
          layout='vertical'
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email" },
              {
                required: true,
                message: 'Please input your email address!',
              },
            ]}
          >
            <Input 
              placeholder='Enter your email address' 
              onChange={handleChange}
              value={formData.email}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password 
              placeholder='Enter password' 
              onChange={handleChange}
              value={formData.password}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
          >
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Text style={{display: "block", textAlign: "center"}}>
          Don't have an account yet?{" "}
          <Link to="/signup">Signup</Link>
        </Text>
      </Card>
    </div>
  )
}
