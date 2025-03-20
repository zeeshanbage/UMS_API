import React, { useState, useEffect } from "react";
import { Upload, Input, Button, Typography, Space, Select, message, Checkbox, Alert } from "antd";

import { insertApplication, getCourses, deleteApplication } from "../../services/courseService";
import DocumentsInput from "./DocumentsInput";
import TextInputFields from "./TextInputFields";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadFile, deleteFile } from "../../services/supabaseClient";

const { Dragger } = Upload;
const { Text, Title } = Typography;

const initialApplicationState = {
    name: '',
    subtitle: '',
    courseId: 0,
    academicYearId: 0,
    imageUrl: '',
    TextInputFields: '',
    Documents: '',
};

const ManageApplications = ({ initialApplication = initialApplicationState }) => {
    const [courseDropdown, setCourseDropdown] = useState([]);
    const [yearDropdown, setYearDropdown] = useState([]);
    const [showError, setShowError] = useState(false);
    const [application, setApplication] = useState(initialApplication);

    // Fetch courses and populate the dropdown
    const fetchCourses = async () => {
        try {
            const response = await getCourses();
            const dropdownItems = response.data.map((course) => ({
                value: course.courseId,
                label: course.title,
                academicYears: course.academicYears, // Include academic years for the course
            }));
            setCourseDropdown(dropdownItems);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Update application state when initialApplication changes
    useEffect(() => {
        setApplication(initialApplication);
    }, [initialApplication]);

    // Handle course selection
    const handleCourseChange = (courseId) => {
        setShowError(false);
        const selectedCourse = courseDropdown.find((course) => course.value === courseId);
        const academicYears = selectedCourse?.academicYears || [];
        setYearDropdown(
            academicYears.map((year) => ({
                value: year.academicYearId,
                label: year.title,
            }))
        );

        setApplication((prev) => ({
            ...prev,
            courseId: courseId,
            academicYearId: 0, // Reset academic year when course changes
        }));
    };

    // Handle year selection
    const handleYearChange = (academicYearId) => {
        setApplication((prev) => ({
            ...prev,
            academicYearId: academicYearId,
        }));
    };

    function handleDynamicFormInput(field, jsonValue) {
        setApplication((prev) => ({
            ...prev,
            [field]: jsonValue,
        }));
    }

    // Insert application
    const handleInsertApplication = async () => {
        try {
            if (application.name === '' || application.courseId === 0 || application.academicYearId === 0) {
                setShowError(true);
                return;
            }
            if(application.applicationId > 0)
            {
                console.log('Deleting existing application first', application.applicationId)
                await deleteApplication(application.applicationId)
            }
            const response = await insertApplication(application);
            setApplication(initialApplicationState); // Reset the form
            message.success('Application inserted successfully.');
        } catch (error) {
            console.error("Error inserting application:", error);
            message.error('Failed to insert application.');
        }
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        listType: "picture",
        customRequest: async ({ file, onSuccess, onError }) => {
            try {
                const imageUrl = await uploadFile(file);
                console.log('uploaded image url ', imageUrl);
                setApplication({ ...application, imageUrl: imageUrl });
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

    return (
        <div style={{ marginBottom: "24px", padding: "16px", border: "1px solid #f0f0f0", borderRadius: "8px" }}>
            <Title level={3}>Create Application</Title>
            <Space direction="vertical" style={{ width: "100%" }} size="large">
                {/* Course and Year Dropdowns */}
                <Space direction="horizontal" style={{ width: "100%" }} size="middle">
                    <div style={{ flex: 1 }}>
                        <Text strong>Select Course</Text>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Choose a course"
                            options={courseDropdown}
                            onChange={handleCourseChange}
                            value={application.courseId}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Text strong>Select Year</Text>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Choose a year"
                            options={yearDropdown}
                            onChange={handleYearChange}
                            value={application.academicYearId}
                            disabled={yearDropdown.length === 0} // Disable if no years are available
                        />
                    </div>
                </Space>

                {/* Application Form Fields */}
                <div>
                    <Text strong>Application Name</Text>
                    <Input
                        value={application.name}
                        placeholder="Addmission Form, Exam Form, Notes etc"
                        onChange={(e) => setApplication({ ...application, name: e.target.value })}
                    />
                </div>
                <div>
                    <Text strong>Application Subtitle</Text>
                    <Input
                        value={application.subtitle}
                        placeholder="Fees = 1000rs, Last Date 10 Mar etc"
                        onChange={(e) => setApplication({ ...application, subtitle: e.target.value })}
                    />
                </div>
                <div>
                    <Text strong>Image</Text>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Please upload only image, size should be small.
                        </p>
                    </Dragger>
                    <Text italic>{application.imageURL}</Text>
                </div>
                <div style={{ border: '1px solid #d9d9d9', padding: '0.5rem', borderRadius: '10px' }}>
                    <DocumentsInput setDocumentValue={handleDynamicFormInput} />
                </div>
                <div style={{ border: '1px solid #d9d9d9', padding: '0.5rem', borderRadius: '10px' }}>
                    <TextInputFields setInputFieldsValue={handleDynamicFormInput} />
                </div>
                <div>
                    {/* <DropdownInputFields setDropdownValue={handleDynamicFormInput}/> */}
                </div>
                <div>
                    {showError && (<Alert
                        message="Error"
                        description="Enter Name, Select course and Year"
                        type="error"
                        showIcon
                        closable
                        afterClose={() => setShowError(false)}
                    />)}
                </div>
                {/* Save Button */}
                <Button type="primary" onClick={handleInsertApplication}>
                    Save Application
                </Button>
            </Space>
        </div>
    );
};

export default ManageApplications;