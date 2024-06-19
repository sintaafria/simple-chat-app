import { Alert, Button, Card, Form, Input } from "antd";
import { Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setError, setUserData, signup } from "../../redux/user/slice";

const { Title, Text } = Typography;

export default function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { error, user_data, isLoading } = useSelector(state => state.user);
	useEffect(() => {
		if (localStorage.getItem("token")) navigate("/");
		else {
            if(user_data){
                setTimeout(() => {
                    navigate('/signin')
                    dispatch(setUserData(null));
                }, 1000)
            }
		}
	}, [user_data]);

	const handleSubmit = value => {
        const {confirm_password, ...payload} = value
		if(confirm_password !== payload.password)
            dispatch(setError("The password confirmation does not match"))
        else dispatch(signup(payload))
	};
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
					Sign Up to SimpleChat
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
					onFinish={handleSubmit}
					// onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please input your name!",
							},
						]}
					>
						<Input placeholder="Enter your name" />
					</Form.Item>
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
					<Form.Item
						label="Confirm Password"
						name="confirm_password"
						rules={[
							{
								required: true,
								message: "Please input your confirm password!",
							},
						]}
					>
						<Input.Password placeholder="Enter confirm password" />
					</Form.Item>
					{error ? (
						<Alert
							message={error}
							type="error"
							showIcon
							style={{ marginBottom: "10px" }}
						/>
					) : null}
                    {user_data ? (
						<Alert
							message="Login successfully"
							type="success"
							showIcon
							style={{ marginBottom: "10px" }}
						/>
					) : null}
					<Form.Item>
						<Button type="primary" htmlType="submit" block loading={isLoading}>
							Submit
						</Button>
					</Form.Item>
				</Form>
				<Text style={{ display: "block", textAlign: "center" }}>
					Already have an account? <Link to="/signin">Signin</Link>
				</Text>
			</Card>
		</div>
	);
}
