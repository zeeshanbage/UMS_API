import React, { useEffect, useState } from 'react';
import { getApplications, deleteApplication} from '../../services/courseService';
import { Table, Typography, Space, Button, Skeleton } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DisplayApplications = ({ handleApplicationEdit }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getApplications(); 
      setLoading(false);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

    const handleApplicationDelete = async (applicationId) => {
      try {
        console.log(applicationId);
        setLoading(true);
        await deleteApplication(applicationId);
        setApplications(applications.filter(app => app.applicationId != applicationId));
        setLoading(false);
      } catch (error) {
        console.log('Failed to delete course!', error);
        handleRefresh();
        setLoading(false);
      }
    };

  const handleRefresh = () => {
    setLoading(true);
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
    <div style={{ padding: '0.5rem' }}>
      <Title level={2}>
        Available Applications
        <div>
          <Button onClick={handleRefresh}>Refresh</Button>
        </div>
      </Title>
      {loading ? (<Skeleton active />)
      : (applications.length > 0 ? (
        <Table
          dataSource={applications}
          columns={columns}
          rowKey={(record) => record.applicationId}
          bordered
          scroll={{x:'300px'}}
        />
      ) : (
        <Text>No applications available at the moment.</Text>
      ))}
    </div>
  );
};

export default DisplayApplications;
