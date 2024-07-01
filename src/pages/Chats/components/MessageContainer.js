import React from "react";
import Messages from "./Messages";
import { Flex, Layout, Spin, Typography } from "antd";
import { useSelector } from "react-redux";
const { Content } = Layout;
const { Title } = Typography;

export default function MessageContainer() {
	const { messages, isLoading } = useSelector(state => state.message);
	return (
		<Content
			style={{
				backgroundColor: "#FFFFFF",
				padding: "20px 16px",
				marginLeft: "20px",
				borderRadius: "10px",
				overflow: "auto",
			}}
		>
			{messages?.length ? (
				<Messages content={messages} />
			) : (
				<Flex
					justify="center"
					align="center"
					style={{ height: "100%" }}
				>
					{isLoading ? (
						<Spin spinning={isLoading} />
					) : (
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
					)}
				</Flex>
			)}
		</Content>
	);
}
