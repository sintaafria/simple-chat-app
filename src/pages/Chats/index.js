import { Avatar, Button, Flex, Input, Layout, Tooltip, Typography } from 'antd'
import { UserOutlined, BellFilled, PlusOutlined } from '@ant-design/icons';
import React from 'react'
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

export default function Chats() {
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: 'center', gap: "30px" }}>
        <Input
          placeholder="Search user"
          prefix={<UserOutlined />}
          style={{ width: "200px" }}
        />
        <Title level={3} style={{ color: "#FFFFFF", fontWeight: 500, margin: "0 auto" }}>
          SimpleChat
        </Title>
        <Tooltip title="Notification">
          <BellFilled style={{ color: "#FFFFFF", fontSize: "18px", cursor: "pointer" }} />
        </Tooltip>
        <Avatar icon={<UserOutlined />} style={{backgroundColor:"#AAAAAA"}}/>
      </Header>
      <Layout style={{ padding: "24px", height: "calc(100vh - 64px)" }}>
        <Sider
          width="320px"
          style={{ borderRadius: "10px", padding: "20px 16px", backgroundColor: "#FFFFFF" }}
        >
          <Flex justify='end'>
            <Button icon={<PlusOutlined />} iconPosition={'end'}>
              New Group Chat
            </Button>
          </Flex>
        </Sider>
        <Content style={{ backgroundColor: "#FFFFFF", padding: "20px 16px", marginLeft: "20px", borderRadius: "10px" }}>
          <Flex justify='center' align='center' style={{height: "100%"}}>
            <Title level={4} style={{ color:"#AAAAAA", fontWeight: 400, margin: "0 auto" }}>
              Click on user to start chatting
            </Title>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  )
}
