import React, { createContext } from "react";
import UMSLayout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"; // Import the CSS file
import CourseComponent from "./components/CourseComponent";
import ApplicationComponent from "./components/Application/ApplicationComponent";

function App() {

  const courseData = [{
    title: '',
    subtitle: '',
    imageUrl: '',
    academicYears: [{}],
  }];

  const applicationData = [{
    name: "",
    subtitle: "",
    academicYearId: 0,
    courseId: 0,
    imageUrl: "",
    applicationId: 0,
    Documents: "",
    TextInputFields: "",
    DropDownFields: ""    
  }];

  const UMSContext = createContext(null)
  const contextData = {courseData, applicationData};
  
  return (
    <UMSContext.Provider value={contextData}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UMSLayout />}>
          <Route index element={<CourseComponent />} />
          <Route path="forms" element={<ApplicationComponent />} />
          <Route path="*" element={<ApplicationComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UMSContext.Provider>
  );
}

export default App;
