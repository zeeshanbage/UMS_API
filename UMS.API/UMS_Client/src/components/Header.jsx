import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;

const items = [
    { key: '1', label: 'Courses' },
    { key: '2', label: 'Create Form' },
    { key: '3', label: 'Submitted Forms'},
];

function UMSHeader() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation(); // Hook to get the current location

    const selectedKey = () => {
        // Determine the selected key based on the current path
        switch(location.pathname === '/forms')
        {
            case '/forms': return 2;
            case '/course' : return 1;
            case '/' : return 3;
        };
    }

    function onSelectItem(event) {
        let path = '/';
        switch (event.key) {
            case '1':
                path = '/course';
                break;
            case '2':
                path = '/forms';
                break;
            case '3':
                path = '/';
                break;
            default:
                break;
        }
        navigate(path);
    }

    return (
        <div style={{ marginBottom: '0.5rem' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginInline:'0.5rem',
                    borderRadius: '0.5rem',
                }}
            >
                <span style={{ color: 'white', marginRight: '1.5rem', flexWrap:'wrap' }}>
                    Umar Multi Services
                </span>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={selectedKey} // Use selectedKeys instead of defaultSelectedKeys
                    items={items}
                    style={{ flex: 1, minWidth: '30px', right:'10px' }}
                    onSelect={onSelectItem}
                />
            </Header>
        </div>
    );
}

export default UMSHeader;
