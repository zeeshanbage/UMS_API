import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Space, Select, message, Checkbox } from "antd";

import { insertApplication, getCourses } from "../../services/courseService";
import DocumentsInput from "./DocumentsInput";
import TextInputFields from "./TextInputFields";
import DropdownInputFields from "./DropdownInputFields";

const { Title, Text } = Typography;
const { Option } = Select;

const ManageApplications = ({ initialApplication }) => {
    const [courseDropdown, setCourseDropdown] = useState([]);
    const [yearDropdown, setYearDropdown] = useState([]);
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
            message.error("Failed to fetch courses.");
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Handle course selection
    const handleCourseChange = (courseId) => {
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
            const response = await insertApplication(application);
            message.success(`Application inserted with ID: ${response.data}`);
        } catch (error) {
            console.error("Error inserting application:", error);
            message.error("Failed to save the application.");
        }
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
                            value={application.courseId || undefined}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Text strong>Select Year</Text>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Choose a year"
                            options={yearDropdown}
                            onChange={handleYearChange}
                            value={application.academicYearId || undefined}
                            disabled={yearDropdown.length === 0} // Disable if no years are available
                        />
                    </div>
                </Space>

                {/* Application Form Fields */}
                <div>
                    <Text strong>Application Name</Text>
                    <Input
                        value={application.name}
                        onChange={(e) => setApplication({ ...application, name: e.target.value })}
                    />
                </div>
                <div>
                    <Text strong>Application Subtitle</Text>
                    <Input
                        value={application.subtitle}
                        onChange={(e) => setApplication({ ...application, subtitle: e.target.value })}
                    />
                </div>
                <div>
                    <Text strong>Image URL</Text>
                    <Input
                        value={application.imageUrl}
                        onChange={(e) => setApplication({ ...application, imageUrl: e.target.value })}
                    />
                </div>
                <div>
                    <DocumentsInput setDocumentValue={handleDynamicFormInput}/>
                </div>
                <div>
                    <TextInputFields setInputFieldsValue={handleDynamicFormInput}/>
                </div>
                <div>
                    {/* <DropdownInputFields setDropdownValue={handleDynamicFormInput}/> */}
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
