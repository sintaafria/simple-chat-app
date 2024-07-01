import {
	Avatar,
	Button,
	Layout,
	Modal,
	Spin,
	Tooltip,
	Typography,
} from "antd";
import {
	UserOutlined,
	BellFilled,
	MessageOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './style.css'
import { logout, userProfile } from "../../redux/auth/slice";
import { useNavigate } from "react-router-dom";
import NewChatDrawer from "./components/NewChatDrawer";
import ChatList from "./components/ChatList";
import MessageContainer from "./components/MessageContainer";
const { Header } = Layout;
const { Title } = Typography;

export default function Chats() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user_data, isLoading } = useSelector(state => state.auth);
	const [showUserProfile, setShowUserProfile] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false)

	useEffect(() => {
		if (!localStorage.getItem("token")) navigate("/signin");
	}, []);

	useEffect(() => {
		if (localStorage.getItem("token") && !user_data)
			dispatch(userProfile());
	}, [user_data]);

	return (
		!user_data || isLoading ?
		<Spin spinning={isLoading} fullscreen />:
		<>
			<Layout>
				<Header
					style={{
						display: "flex",
						alignItems: "center",
						gap: "30px",
					}}
				>
					<Button 
						icon={<MessageOutlined />} 
						iconPosition="end"
						onClick={() => setShowDrawer(true)}
					>
						New Chat
					</Button>
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
					<ChatList/>
					<MessageContainer/>
				</Layout>
			</Layout>
			<NewChatDrawer open={showDrawer} onClose={() => setShowDrawer(false)}/>
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
						style={{
							fontWeight: 500,
							marginTop: "24px",
							marginBottom: 0,
						}}
					>
						{user_data?.name}
					</Title>
					<Title
						level={5}
						style={{
							fontWeight: 400,
							marginTop: 0,
							marginBottom: "16px",
						}}
					>
						{user_data?.email}
					</Title>
					<Button
						type="primary"
						loading={isLoading}
						onClick={() => dispatch(logout())}
					>
						Sign out
					</Button>
				</div>
			</Modal>
		</>
	);
}
