import { Layout, Row, Col, Typography } from "antd";
import React, { useState } from "react";
import ManageCourses from "./ManageCourses";
import DisplayCourses from "./DisplayCourses";

function CourseComponent() {
  const [course, setCourse] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    academicYears: [{}],
  });

  const handleCourseEdit = (courseToEdit) => {
    console.log(courseToEdit);
    setCourse(courseToEdit);
  };


  return (
    <Row className="actual-content"
    >
      {/* Left side: CourseComponent (60%) */}
      <Col
        xs={24} // Full width on extra-small screens
        sm={24} // Full width on small screens
        md={12} // Half width on medium screens
        lg={10} // 10-column width on large screens
        className="app-course-section"
      >
        <ManageCourses iniCourse={course} />
      </Col>

      {/* Right side: DisplayCourses (40%) */}
      <Col
        xs={24} // Full width on extra-small screens
        sm={24} // Full width on small screens
        md={12} // Half width on medium screens
        lg={13} // 13-column width on large screens
        className="app-display-section"
      >
        <DisplayCourses handleCourseEdit={handleCourseEdit} />
      </Col>
    </Row>
  );
}

export default CourseComponent;
