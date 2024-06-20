import { Alert, Button, Card, Checkbox, Form, Input } from "antd";
import { Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, setUserData } from "../../redux/auth/slice";

const { Title, Text } = Typography;

export default function Signin() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, user_data, isLoading } = useSelector(state => state.auth);

	const handleSubmit = value => {
		dispatch(login(value));
	};

	useEffect(() => {
		if (localStorage.getItem("token")) navigate("/");
		else {
			navigate('/signin')
			dispatch(setUserData(null));
		}
	}, [user_data]);

	return (
		<div
			style={{
				display: "flex",
				minHeight: "100vh",
				backgroundColor: "#F7F8FB",
				padding: "40px",
			}}
		>
			<Card bordered={false} style={{ width: "500px", margin: "auto" }}>
				<Title
					level={3}
					style={{
						textAlign: "center",
						fontWeight: 500,
						marginBottom: "40px",
					}}
				>
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
					layout="vertical"
					// onFinishFailed={onFinishFailed}
					autoComplete="off"
					onFinish={handleSubmit}
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ type: "email" },
							{
								required: true,
								message: "Please input your email address!",
							},
						]}
					>
						<Input placeholder="Enter your email address" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password placeholder="Enter password" />
					</Form.Item>

					<Form.Item name="remember" valuePropName="checked">
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
          {
            error?
            <Alert
              message={error}
              type="error"
              showIcon
              style={{marginBottom: "10px"}}
            />: null
          }
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							loading={isLoading}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
				<Text style={{ display: "block", textAlign: "center" }}>
					Don't have an account yet? <Link to="/signup">Signup</Link>
				</Text>
			</Card>
		</div>
	);
}
