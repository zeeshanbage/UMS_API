import { useState } from "react";
import { Input, Button, Typography, Space, Select, message, Checkbox, Dropdown } from "antd";
import React from "react";


const { Title, Text } = Typography;

function DocumentsInput({ setDocumentValue }) {

    const DocumentsTypes = [
        { value: 'pdf', label: '.pdf' },
        { value: 'img', label: '.img' },
        { value: 'doc', label: '.doc' },
        { value: 'any', label: 'any' }
    ]

    const [documentsInput, setDocumentsInput] = useState([{
        name: "",
        type: 'any',
        isRequired: false
    },
    ])

    const addDocument = () => {
        setDocumentsInput([...documentsInput, { name: '', isRequired: false, type: 'any' }]);
    };

    const removeDocument = (index) => {
        const updateDocs = documentsInput.filter((_, i) => i !== index);
        setDocumentsInput(updateDocs);
    };

    function handleDocumentInputChange(index, field, value) {
        setDocumentsInput((prevDocuments) => {
            const updatedDocuments = [...prevDocuments];
            updatedDocuments[index] = { ...updatedDocuments[index], [field]: value };
            return updatedDocuments;
        });
        const jsonString = JSON.stringify(documentsInput);
        setDocumentValue('Documents', jsonString);
    }

    return (
        <>
            <Text strong>Documents required to fill this Form</Text>
            {documentsInput.map((doc, index) => (
                <Space key={index} align="baseline" style={{ width: '100%', margin:'10px', flexWrap:'wrap' }}>
                    <Text style={{}}>Document Name </Text>
                    <Input
                        placeholder="adharCard, Result etc"
                        value={doc.name}
                        onChange={(e) => handleDocumentInputChange(index, 'name', e.target.value)}
                    />
                    <Select options={DocumentsTypes} onChange={(value) => handleDocumentInputChange(index, 'type', value)} value={doc.type}/>
                    <Checkbox onChange={(e) => handleDocumentInputChange(index, 'isRequired', e.target.checked)}>Required</Checkbox>
                    <Button type="primary" danger onClick={() => removeDocument(index)}>
                        Remove
                    </Button>
                </Space>
            ))}
            <Button type="primary" onClick={addDocument} style={{ width: '100%', padding:'10px' }}>
                Add More
            </Button>
        </>
    )
}

export default DocumentsInput;