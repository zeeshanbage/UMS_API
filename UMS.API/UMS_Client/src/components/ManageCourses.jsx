import React, { useEffect, useState } from 'react';
import { Input, Button, Typography, Space, Table, message } from 'antd';
import { insertCourse } from '../services/courseService'; // API service

const { Title, Text } = Typography;

const ManageCourses = ({iniCourse}) => {
  const [course, setCourse] = useState(iniCourse);


  const handleAddAcademicYear = () => {
    if(course.academicYears.length<4)
    {
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
      await insertCourse(course);
      message.success('Course inserted successfully!');
      setCourse({ title: '', subtitle: '', imageUrl: '', academicYears: [] });
    } catch (error) {
      message.error('Failed to insert course!');
    }
  };



  useEffect(()=> {
    setCourse(iniCourse);
  }, [iniCourse]);

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={2}>Course Management</Title>

      {/* Create Course Section */}
      <div style={{ marginBottom: '24px', padding: '16px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
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
          <div>
            <Text strong>Image URL</Text>
            <Input
              value={course.imageUrl}
              onChange={(e) => setCourse({ ...course, imageUrl: e.target.value })}
            />
          </div>
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
          <Button type="primary" onClick={handleInsertCourse}>
            Save Course
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ManageCourses;
