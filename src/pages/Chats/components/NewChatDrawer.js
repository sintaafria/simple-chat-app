import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Button, Divider, Drawer, Flex, Input, Skeleton, Typography } from "antd";
import {
	SearchOutlined,
	WechatOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { searchUser } from "../../../redux/user/slice";
const { Title, Text } = Typography;

export default function NewChatDrawer({ open, onClose }) {
	const { users, isLoading } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [search, setSearch] = useState("")

	const handleSearch = useCallback(
		debounce((e) => {
			dispatch(searchUser(e.target.value))
			setSearch(e.target.value)
		}, 1000), []
	)
	
	return (
		<Drawer title="New Chat" open={open} onClose={onClose} placement="left">
			<Input
				placeholder="Search username"
				size="middle"
				prefix={
					<SearchOutlined
						style={{ color: "#7d7c7c", marginRight: "16px" }}
					/>
				}
				onChange={handleSearch}
			/>
			<Button
				icon={<WechatOutlined />}
				iconPosition="end"
				style={{ color: "#737373", marginTop: "12px", width: "100%" }}
			>
				New GroupnChat
			</Button>
			<Divider />
			<Flex vertical gap={12}>
				{users?.length ? (
					users.map((i, idx) => (
						<Card key={idx} className="user-card">
							<Flex
								gap={12}
								align="center"
								style={{ height: "100%" }}
							>
								<Avatar
									icon={<UserOutlined />}
									style={{
										backgroundColor: "#AAAAAA",
										cursor: "pointer",
										flex: "none",
									}}
								/>
								<div>
									<Title
										level={5}
										style={{
											color: "#565656",
											fontWeight: 400,
											margin: 0,
										}}
									>
										{i?.name}
									</Title>
									<Text style={{ color: "#1e1e1e", fontWeight: 500 }}>
										{i?.email}
									</Text>
								</div>
							</Flex>
						</Card>
					))
				) : (
					isLoading ?
					<Skeleton avatar paragraph={{ rows: 2 }} />:
					<Text
						style={{
							color: "rgb(170, 170, 170)",
							margin: "0 auto",
						}}
					>
						{
							search.length ?
							"No result found":
							"Results will apear here"
						}
					</Text>
				)}
			</Flex>
		</Drawer>
	);
}
