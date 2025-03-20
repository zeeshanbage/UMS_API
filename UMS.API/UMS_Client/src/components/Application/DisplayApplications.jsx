import React, { useEffect, useState } from 'react';
import { getApplications, deleteApplication} from '../../services/courseService';
import { Table, Typography, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DisplayApplications = ({ handleApplicationEdit }) => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await getApplications(); 
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

    const handleApplicationDelete = async (applicationId) => {
      try {
        console.log(applicationId);
        await deleteApplication(applicationId);
        setApplications(applications.filter(app => app.applicationId != applicationId));
      } catch (error) {
        console.log('Failed to delete course!', error);
        handleRefresh();
      }
    };

  const handleRefresh = () => {
    fetchApplications();
  };

  // Fetch applications from the API
  useEffect(() => {
    fetchApplications();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'applicationId',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Course Title',
      dataIndex: 'courseTitle',
      key: 'courseTitle',
    },
    {
      title: 'Academic Year Title',
      dataIndex: 'academicYearTitle',
      key: 'academicYearTitle',
    },
    {
      title: 'Subtitle',
      dataIndex: 'subtitle',
      key: 'subtitle',
    },
    {
      title: 'Image URL',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      ),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, record) => (
        <Space direction="vertical">
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ width: '80%' }}
            onClick={() => handleApplicationEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            style={{ width: '80%' }}
            onClick={() => handleApplicationDelete(record.applicationId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        Available Applications
        <div>
          <Button onClick={handleRefresh}>Refresh</Button>
        </div>
      </Title>
      {applications.length > 0 ? (
        <Table
          dataSource={applications}
          columns={columns}
          rowKey={(record) => record.applicationId}
          bordered
        />
      ) : (
        <Text>No applications available at the moment.</Text>
      )}
    </div>
  );
};

export default DisplayApplications;
