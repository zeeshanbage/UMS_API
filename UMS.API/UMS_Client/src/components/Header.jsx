import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;

const items = [
    { key: '1', label: 'Courses' },
    { key: '2', label: 'Applications/Forms' }
];

function UMSHeader() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation(); // Hook to get the current location

    // Determine the selected key based on the current path
    const selectedKey = location.pathname === '/forms' ? '2' : '1';

    function onSelectItem(event) {
        let path = '/';
        switch (event.key) {
            case '1':
                path = '/';
                break;
            case '2':
                path = '/forms';
                break;
            default:
                break;
        }
        navigate(path);
    }

    return (
        <div style={{ marginBottom: '10px' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <span style={{ color: 'white', marginRight: '24px' }}>
                    Umar Multi Services
                </span>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedKey]} // Use selectedKeys instead of defaultSelectedKeys
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                    onSelect={onSelectItem}
                />
            </Header>
        </div>
    );
}

export default UMSHeader;
