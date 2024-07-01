import React, { useLayoutEffect, useRef, useState } from "react";
import Messages from "./Messages";
import { Flex, Input, Layout, Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageRequest } from "../../../services/message";
import { setMessages } from "../../../redux/message/slice";
const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

export default function MessageContainer() {
	const { messages, isLoading } = useSelector(
		state => state.message
	);
    const {open_chat} = useSelector(state => state.chat)
	const [message, setMessage] = useState("");
    const dispatch = useDispatch()

    const sendMessage = async() => {
        try{
            setMessage("")
            const {data} = await sendMessageRequest({
                "chat_id": open_chat?._id,
                "content": message 
            })
            dispatch(setMessages([data, ...messages]))
        }catch(e){
            console.error(e)
        }
    }
    
	return (
		<Content
			style={{
				backgroundColor: "#FFFFFF",
				padding: "20px 16px",
				marginLeft: "20px",
				borderRadius: "10px",
				display: "flex",
				flexDirection: "column",
				gap: "10px",
			}}
		>
			<div
				style={{
					overflow: "auto",
					height: "100%",
					marginBottom: "10px",
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
						) : !open_chat ? (
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
						) : (
							null
						)}
					</Flex>
				)}
			</div>
			{open_chat ? (
				<div style={{ flex: "none" }}>
					<TextArea
						placeholder="Enter message here"
						autoSize={{ minRows: 1, maxRows: 5 }}
						value={message}
						onChange={e => {
                            setMessage(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                if(!e.shiftKey) {
                                    e.preventDefault()
                                    sendMessage()
                                }
                            }
                        }}
					/>
				</div>
			 ) : null}
		</Content>
	);
}
