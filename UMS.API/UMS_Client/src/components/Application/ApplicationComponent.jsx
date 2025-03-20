import React, { useState } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { insertApplication, updateApplication, deleteApplication } from "../../services/courseService";
import ManageApplications from "./ManageApplications";
import DisplayApplications from "./DisplayApplications";

const { Title, Text } = Typography;

const ApplicationComponent = () => {
  const [application, setApplication] = useState({
    name: "",
    subtitle: "",
    academicYearId: 0,
    courseId: 0,
    imageUrl: "",
    applicationId: 0,
    Documents: "",
    TextInputFields: "",
    DropDownFields: ""    
  });

  const handleApplicationEdit = (formToEdit) => {
    console.log(formToEdit)
    setApplication(formToEdit);
  };

  return (
    <div>
       <Row className="actual-content">
          {/* Left side: CourseComponent (60%) */}
          <Col
            xs={24} // Full width on extra-small screens
            sm={24} // Full width on small screens
            md={12} // Half width on medium screens
            lg={10} // 10-column width on large screens
            className="app-course-section"
          >
            <ManageApplications initialApplication={application} />
          </Col>

          {/* Right side: DisplayCourses (40%) */}
          <Col
            xs={24} // Full width on extra-small screens
            sm={24} // Full width on small screens
            md={12} // Half width on medium screens
            lg={13} // 13-column width on large screens
            className="app-display-section"
          >
            <DisplayApplications handleApplicationEdit={handleApplicationEdit} />
          </Col>
        </Row>
    </div>
  );
};

export default ApplicationComponent;
