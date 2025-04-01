import React from 'react';
import { Card, Button, Typography, List, Divider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { DownloadFile } from '../../services/supabaseClient';

const { Title, Text } = Typography;

const SubmittedFormView = () => {
  const location = useLocation();
  const { selectedForm } = location.state || {
    documentsData: '',
    textInputFieldsData: '',
    courseTitle: '',
    academicYearTitle: '',
    status: '',
  };

  const documents = selectedForm.documentsData ? JSON.parse(selectedForm.documentsData) : [];
  const textFields = selectedForm.textInputFieldsData ? JSON.parse(selectedForm.textInputFieldsData) : [];

  async function downloadDoc(FilePath) {
    await DownloadFile(FilePath);
  }

  return (
    <Card bordered={false} style={{ maxWidth: '600px', padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>{selectedForm.name}</Title>
      <Divider />
      <Title level={4}>Course: {selectedForm.courseTitle}</Title>
      <Title level={4}>Academic Year: {selectedForm.academicYearTitle}</Title>
      <Divider />

      <List
        bordered
        dataSource={Object.entries(textFields)}
        renderItem={([key, value]) => (
          <List.Item>
            <Text strong>{key}:</Text> <Text>{value}</Text>
          </List.Item>
        )}
        style={{ marginBottom: '20px' }}
      />
      <Divider />

      <Title level={4}>Submitted Documents</Title>
      <List
        bordered
        dataSource={documents}
        renderItem={({ DocumentName, Link }) => (
          <List.Item>
            <Text strong>{DocumentName}</Text>
            <Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadDoc(Link)} style={{ marginLeft: '10px' }}>
              Download
            </Button>
          </List.Item>
        )}
      />

      <Title level={4}>Status: {selectedForm.status}</Title>

    </Card>
  );
};

export default SubmittedFormView;