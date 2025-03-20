import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const getCourses = () => axios.get(`${API_BASE_URL}/GetCourses`);
export const insertCourse = (course) => {axios.post(`${API_BASE_URL}/SaveCourse`, course)};
export const deleteCourse = (courseId) => axios.post(`${API_BASE_URL}/DeleteCourse?courseId=${courseId}`);

export const insertApplication = (application) => axios.post(`${API_BASE_URL}/InsertApplication`, application);
export const updateApplication = (application) => axios.post(`${API_BASE_URL}/UpdateApplication`, application);
export const deleteApplication = (applicationId) => axios.post(`${API_BASE_URL}/DeleteApplication?applicationId=${applicationId}`);
export const getApplications = () => axios.get(`${API_BASE_URL}/GetApplications`);
