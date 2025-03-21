import { useState } from "react";
import { Input, Button, Typography, Space, Select, message, Checkbox, Dropdown } from "antd";
import React from "react";


const { Title, Text } = Typography;

function TextInputFields({ setInputFieldsValue }) {


    const [textFields, setTextFields] = useState([{
        name: "Full Name",
        isRequired: "checked"
    },
    {
        name: "Mobile Number",
        isRequired: false
    },
    ])

    const addTextField = () => {
        setTextFields([...textFields, { name: '', isRequired: false }]);
    };

    const removeTextField = (index) => {
        const updatedFields = textFields.filter((_, i) => i !== index);
        setTextFields(updatedFields);
    };

    function handleTextInputFieldChange(index, field, value) {
        setTextFields((prev) => {
            const updatedFields = [...prev];
            updatedFields[index] = { ...updatedFields[index], [field]: value };
            return updatedFields;
        });
        const jsonString = JSON.stringify(textFields);
        setInputFieldsValue('TextInputFields', jsonString);
    }

    return (
        <>
            <Text strong>Text fields required for filling this form</Text>
            {textFields.map((doc, index) => (
                <Space key={index} align="baseline" style={{ width: '100%', margin:'10px', flexWrap:'wrap' }}>
                    <Text style={{}}>Text Field {index+1} </Text>
                    <Input
                        value={doc.name}
                        onChange={(e) => handleTextInputFieldChange(index, 'name', e.target.value)}
                    />
                    <Checkbox checked={doc.isRequired} onChange={(e) => handleTextInputFieldChange(index, 'isRequired', e.target.value)}>Required</Checkbox>
                    <Button type="primary" danger onClick={() => removeTextField(index)}>
                        Remove
                    </Button>
                </Space>
            ))}
            <Button type="primary" ghost onClick={addTextField} style={{ width: '100%', padding:'10px' }}>
                Add More
            </Button>
        </>
    )
}

export default TextInputFields;