import {
	Avatar,
	Button,
	Flex,
	Input,
	Layout,
	Modal,
	Tooltip,
	Typography,
} from "antd";
import { UserOutlined, BellFilled, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, userProfile } from "../../redux/user/slice";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function Chats() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user_data, isLoading } = useSelector(state => state.user);
	const [showUserProfile, setShowUserProfile] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem("token")) navigate("/signin");
	}, []);

	useEffect(() => {
		if (localStorage.getItem("token") && !user_data)
			dispatch(userProfile());
	}, [user_data]);

	return (
		<>
			<Layout>
				<Header
					style={{
						display: "flex",
						alignItems: "center",
						gap: "30px",
					}}
				>
					<Input
						placeholder="Search user"
						prefix={<UserOutlined />}
						style={{ width: "200px" }}
					/>
					<Title
						level={3}
						style={{
							color: "#FFFFFF",
							fontWeight: 500,
							margin: "0 auto",
						}}
					>
						SimpleChat
					</Title>
					<Tooltip title="Notification">
						<BellFilled
							style={{
								color: "#FFFFFF",
								fontSize: "18px",
								cursor: "pointer",
							}}
						/>
					</Tooltip>
					<Avatar
						icon={<UserOutlined />}
						style={{
							backgroundColor: "#AAAAAA",
							cursor: "pointer",
						}}
						onClick={() => setShowUserProfile(true)}
					/>
				</Header>
				<Layout
					style={{ padding: "24px", height: "calc(100vh - 64px)" }}
				>
					<Sider
						width="320px"
						style={{
							borderRadius: "10px",
							padding: "20px 16px",
							backgroundColor: "#FFFFFF",
						}}
					>
						<Flex justify="end">
							<Button
								icon={<PlusOutlined />}
								iconPosition={"end"}
							>
								New Group Chat
							</Button>
						</Flex>
					</Sider>
					<Content
						style={{
							backgroundColor: "#FFFFFF",
							padding: "20px 16px",
							marginLeft: "20px",
							borderRadius: "10px",
						}}
					>
						<Flex
							justify="center"
							align="center"
							style={{ height: "100%" }}
						>
							<Title
								level={4}
								style={{
									color: "#AAAAAA",
									fontWeight: 400,
									margin: "0 auto",
								}}
							>
								Click on user to start chatting
							</Title>
						</Flex>
					</Content>
				</Layout>
			</Layout>
			<Modal
				title="User Profile"
				open={showUserProfile}
				onCancel={() => setShowUserProfile(false)}
				footer={null}
			>
				<div style={{ textAlign: "center", padding: "16px 0" }}>
					<Avatar
						size={82}
						icon={<UserOutlined />}
						style={{ backgroundColor: "#AAAAAA" }}
					/>
					<Title
						level={4}
						style={{ fontWeight: 500, marginTop: "24px", marginBottom:0 }}
					>
						{user_data?.name}
					</Title>
					<Title level={5} style={{ fontWeight: 400, marginTop: 0, marginBottom: "16px" }}>
						{user_data?.email}
					</Title>
					<Button type="primary" loading={isLoading} onClick={() => dispatch(logout())}>
						Sign out
					</Button>
				</div>
			</Modal>
		</>
	);
}
