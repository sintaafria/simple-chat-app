import { Avatar, Flex, Input, Layout, List, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { chatList } from "../../../redux/chat/slice";
const { Sider } = Layout;
const { Title, Text } = Typography;

export default function ChatList() {
	const dispatch = useDispatch();
	const { chat_list, isLoading } = useSelector(state => state.chat);
	const { user_data } = useSelector(state => state.auth);
	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(chatList());
	}, []);
	return (
		<Sider
			width="320px"
			style={{
				borderRadius: "10px",
				backgroundColor: "#FFFFFF",
				overflow: "auto",
			}}
		>
			<div style={{ padding: "20px 16px" }}>
				<Input
					placeholder="Search"
					size="large"
					prefix={
						<SearchOutlined
							style={{
								color: "#7d7c7c",
								marginRight: "16px",
							}}
						/>
					}
				/>
			</div>
			{
				chat_list?.length ? (
					<>
						<List
							className="chat-list"
							itemLayout="horizontal"
							dataSource={chat_list}
							renderItem={(item, index) => (
								<List.Item key={index}>
									<List.Item.Meta
										avatar={
											<Avatar
												size={42}
												icon={
													item?.is_group_chat ? (
														<TeamOutlined />
													) : (
														<UserOutlined />
													)
												}
												style={{
													backgroundColor: "#AAAAAA",
													cursor: "pointer",
													flex: "none",
												}}
											/>
										}
										title={
											<Title
												level={5}
												style={{
													color: "#565656",
													fontWeight: 400,
													margin: 0,
												}}
											>
												{item?.is_group_chat
													? item?.chat_name
													: item?.users?.find(
															i =>
																i._id !=
																user_data._id
													  )?.name}
											</Title>
										}
										description={`${
											item?.is_group_chat
												? `${item?.latest_message?.sender?.name}: `
												: ""
										}${item?.latest_message?.content}`}
									/>
								</List.Item>
							)}
						/>
					</>
				) : null
				// ) : (
				// 	isLoading ?
				// 	<Skeleton avatar paragraph={{ rows: 1 }} />:
				// 	<Text
				// 		style={{
				// 			color: "rgb(170, 170, 170)",
				// 			margin: "0 auto",
				// 		}}
				// 	>
				// 		{
				// 			search.length ?
				// 			"No result found":
				// 			"Results will apear here"
				// 		}
				// 	</Text>
				// )
			}
		</Sider>
	);
}
