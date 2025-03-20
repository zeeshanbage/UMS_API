import { useState } from "react";
import { Input, Button, Typography, Space, Select, message, Checkbox, Dropdown } from "antd";
import React from "react";


const { Title, Text } = Typography;

function DropdownInputFields({ setDropdownValue }) {


    const [dropdownFields, setDropdownFields] = useState([{
        name: "Full Name",
        isMultiSelect: true,
        items: [{label:'', value:''},]
    }
    ])

    const addTextField = () => {
        setDropdownFields([...dropdownFields, { name: '', isRequired: false }]);
    };

    const removeTextField = (index) => {
        const updatedFields = dropdownFields.filter((_, i) => i !== index);
        setDropdownFields(updatedFields);
    };

    function handleDropdownFieldChange(index, field, value) {
        setDropdownFields((prev) => {
            const updatedFields = [...prev];
            updatedFields[index] = { ...updatedFields[index], [field]: value };
            return updatedFields;
        });
        console.log(value);
        const jsonString = JSON.stringify(dropdownFields, null, 2);
        setDropdownValue('TextInputFields', jsonString);
    }

    return (
        <>
            <Text strong>Text Input Fields</Text>
            {dropdownFields.map((item, index) => (
                <Space key={index} align="baseline" style={{ width: '100%', margin:'10px' }}>
                    <Text style={{}}>Dropdown items {index+1} </Text>
                    <Input
                        value={item.name}
                        onChange={(e) => handleDropdownFieldChange(index, 'name', e.target.value)}
                    />
                    <Checkbox onChange={(e) => handleDropdownFieldChange(index, 'isMultiSelect', e.target.value)}>Required</Checkbox>
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

export default DropdownInputFields;