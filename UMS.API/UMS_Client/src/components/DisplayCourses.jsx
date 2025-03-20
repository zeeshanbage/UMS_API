import React, { useEffect, useState } from 'react';
import { getCourses, deleteCourse } from '../services/courseService'; // API service
import { Table, Typography, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DisplayCourses = ({ handleCourseEdit }) => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await getCourses(); // Replace with your actual API endpoint
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  function handleRefresh() {
    fetchCourses();
  }

  const handleDeleteCourse = async (courseId) => {
    try {
      console.log(courseId);
      await deleteCourse(courseId);
      setCourses(courses.filter(course => course.courseId != courseId));
    } catch (error) {
      console.log('Failed to delete course!', error);
      handleRefresh();
    }
  };

  // Fetch courses from the API
  useEffect(() => {
    fetchCourses();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'courseId',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
          Link</a>
      ),
    },
    {
      title: 'Academic Years',
      key: 'academicYears',
      render: (_, record) => (
        <Space direction="vertical">
          {record.academicYears.map((year) => (
            <Text key={year.academicYearId}>{year.title}</Text>
          ))}
        </Space>
      ),
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (_, record) => (
        <Space direction="vertical">
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ width: '80%' }}
            onClick={() => handleCourseEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            style={{ width: '80%' }}
            onClick={() => handleDeleteCourse(record.courseId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Available Courses
        <div>
          <Button onClick={handleRefresh}>Refresh</Button>
        </div>
      </Title>
      {courses.length > 0 ? (
        <Table
          dataSource={courses}
          columns={columns}
          rowKey={(record) => record.courseId}
          bordered
        />
      ) : (
        <Text>No courses available at the moment.</Text>
      )}
    </div>
  );
};

export default DisplayCourses;
