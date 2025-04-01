import React from 'react';
import { Modal, List, Typography } from 'antd';

const { Title, Text } = Typography;

const ViewFormModal = ({ viewForm, showViewModal, handleOk }) => {
  const documents = viewForm.documents ? JSON.parse(viewForm.documents) : [];
  const textFields = viewForm.textInputFields ? JSON.parse(viewForm.textInputFields) : [];

  return (
    <Modal title={viewForm.name} open={showViewModal} onOk={handleOk} onCancel={handleOk}>
      <Title level={4}>{viewForm.subtitle}</Title>
      <Title level={4}>Course: {viewForm.courseTitle}</Title>
      <Title level={4}>Academic Year: {viewForm.academicYearTitle}</Title>

      <Title level={4}>Info</Title>
      <List
        bordered
        dataSource={textFields}
        renderItem={({ name, isRequired }) => (
          <List.Item>
            <Text strong>{name}</Text>
          </List.Item>
        )}
      />

      <Title level={4}>Documents</Title>
      <List
        bordered
        dataSource={documents}
        renderItem={({ name, type, isRequired }) => (
          <List.Item>
            <Text strong>{name}</Text>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ViewFormModal;