import UMSHeader from "./Header";
import { Layout } from "antd";
import { Outlet } from "react-router-dom"; 

const { Content } = Layout;

import React from 'react';
const UMSLayout = () => {
    return (
      <>
        <Layout className="app-layout">
            <UMSHeader/>
            <Content className="app-content">
                <Outlet />
            </Content>
        </Layout>
      </>
    );
  }

export default UMSLayout;