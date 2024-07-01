import { Avatar, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";

export default function Messages({ content }) {
	const { user_data } = useSelector(state => state.auth);
	return (
		<Flex vertical gap={10} style={{flexDirection: "column-reverse", height: "100%", overflow:"auto"}}>
			{content?.map((i, idx) =>
				i?.sender?._id == user_data?._id ? (
					<div style={{ marginLeft: "auto", maxWidth:"50%" }} key={idx}>
						<div
							className="message"
							style={{ backgroundColor: "#F0F5FF" }}
						>
							<p>{i?.content}</p>
						</div>
					</div>
				) : (
					<div style={{ marginRight: "auto", maxWidth:"50%" }} key={idx}>
						<Flex gap={8}>
							<Avatar
								icon={<UserOutlined />}
								style={{
									backgroundColor: "#AAAAAA",
                                    flex: "none"
								}}
							/>
							<div className="message">
								<p
									style={{
										fontWeight: 500,
										marginBottom: "6px",
									}}
								>
									{i?.sender?.name}
								</p>
								<p>{i?.content}</p>
							</div>
						</Flex>
					</div>
				)
			)}
		</Flex>
	);
}
