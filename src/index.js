import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#0549cf',
        fontFamily: "'Inter', sans-serif",
        borderRadius: "5px"
      },
    }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
