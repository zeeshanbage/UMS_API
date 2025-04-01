import { Table, Typography, Space, Button, Skeleton } from 'antd';
import { useEffect, useState } from "react";
import { getSubmittedForms } from "../../services/courseService";
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function DisplayAllForms() {
    const [submittedForms, setSubmittedForms] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    async function getAllForms() {
        try {
            setLoading(true);
            const response = await getSubmittedForms();
            console.log(response.data)
            setSubmittedForms(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("Error fetching all forms", error);
        }
    }

    function handleRefresh() {
        setLoading(true); // Set loading to true when refreshing
        getAllForms();
    }

    function openSingleForm(selectedForm) {
        console.log(selectedForm);
        navigate('/submittedForm', { state: { selectedForm } });
    }

    const columns = [
        {
            title: 'FormId',
            dataIndex: 'submittedFormId',
            key: 'id',
        },
        {
            title: 'FormName',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Course',
            dataIndex: 'courseTitle',
            key: 'courseTitle',
        },
        {
            title: 'Academic Year',
            dataIndex: 'academicYearTitle',
            key: 'academicYearTitle',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'name',
        },
        // {
        //     title: 'Open',
        //     key: 'OpenForm',
        //     render:(_, record) => (
        //         <Space>
        //             <Button 
        //                 type='primary'
        //                 style={{ width: '80%' }}
        //                 onClick={() => openSingleForm(record)}
        //                 >
        //                     Open
        //                 </Button>
        //         </Space>
        //     )
        // },
    ];

    useEffect(() => {
        getAllForms();
    }, []);

    return (
        <div style={{ padding: '0.5rem' }}>
            <Title  level={2}>Submitted Froms
                <div >
                    <Button onClick={handleRefresh}>Refresh</Button>
                </div>
            </Title>
            {loading ? (
                <Skeleton active /> // Display skeleton while loading
            ) :
                <Table
                    dataSource={submittedForms}
                    columns={columns}
                    rowKey={submittedForms.SubmittedFormId}
                    bordered
                    scroll={{ x: '300px' }}
                    onRow={(record) => ({
                        onClick: () => openSingleForm(record),
                    })}
                />}
        </div>
    );
}