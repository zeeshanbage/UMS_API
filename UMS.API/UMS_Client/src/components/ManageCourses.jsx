import React, { useEffect, useState } from 'react';
import { Input, Button, Typography, Space, App, Upload, message } from 'antd';
import { insertCourse } from '../services/courseService';
import { uploadFile, deleteFile } from '../services/supabaseClient';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Dragger } = Upload;

const ManageCourses = ({ iniCourse }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [course, setCourse] = useState(iniCourse);
  const [fileList, setFileList] = useState([]);


  const handleAddAcademicYear = () => {
    if (course.academicYears.length < 4) {
      setCourse((prev) => ({
        ...prev,
        academicYears: [...prev.academicYears, { title: '' }],
      }));
    }
  };

  const handleRemoveAcademicYear = (index) => {
    const updatedAcademicYears = course.academicYears.filter((_, i) => i !== index);
    setCourse((prev) => ({
      ...prev,
      academicYears: updatedAcademicYears,
    }));
  };

  const handleAcademicYearChange = (index, value) => {
    const updatedAcademicYears = [...course.academicYears];
    updatedAcademicYears[index].title = value;
    setCourse((prev) => ({
      ...prev,
      academicYears: updatedAcademicYears,
    }));
  };

  const handleInsertCourse = async () => {
    try {
      if (course.title == '') {
        messageApi.error('Title is empty');
        return -1;
      }
      insertCourse(course);
      setCourse({ title: '', subtitle: '', imageUrl: '', academicYears: [] });
      setFileList([]);
      message.success('Success!');
    } catch (error) {
      console.log('Failed to insert course!');
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    FileList: { fileList },
    listType: "picture",
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const imageUrl = await uploadFile(file);
        setCourse({ ...course, imageUrl: imageUrl });
        onSuccess('ok');
      } catch (error) {
        onError(error);
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },

    onRemove: async (file) => {
      await deleteFile(file);
    },
  };


  useEffect(() => {
    setCourse(iniCourse);
  }, [iniCourse]);

  return (
    <div style={{ padding: '1rem' }}>
      {contextHolder}
      <Title level={2}>Course Management</Title>

      {/* Create Course Section */}
      <div style={{ marginBottom: '24px', padding: '0.5rem', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
        <Title level={3}>Create Course</Title>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Text strong>Course Title</Text>
            <Input
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
            />
          </div>
          <div>
            <Text strong>Course Subtitle</Text>
            <Input
              value={course.subtitle}
              onChange={(e) => setCourse({ ...course, subtitle: e.target.value })}
            />
          </div>
          <Text italic> Image URL: {course.imageUrl}</Text>
          <div >
            <Text strong>Academic Years</Text>
            <Space direction="vertical" style={{ width: '100%' }}>
              {course.academicYears && course.academicYears.map((year, index) => (
                <Space key={index} align="baseline" style={{ width: '100%' }}>
                  <Input
                    placeholder={`Academic Year ${index + 1}`}
                    value={year.title}
                    onChange={(e) => handleAcademicYearChange(index, e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <Button type="primary" danger onClick={() => handleRemoveAcademicYear(index)}>
                    Remove
                  </Button>
                </Space>
              ))}
              <Button type="primary" onClick={handleAddAcademicYear}>
                Add Year
              </Button>
            </Space>
          </div>
          <div>
            <Text strong>Image URL</Text>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Please upload only image, size should be small.
              </p>
            </Dragger>
            <Text strong>Image URL</Text>

          </div>

          <Button type="primary" onClick={handleInsertCourse}>
            Save Course
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ManageCourses;
