import React from 'react';
import { Row, Col, Form, Input } from 'antd';

const CustomInput = ({fieldName, iLabel, errMjs, iPlaceholder, ihandleInputChange, iReadOnly, ionKeyPress, ionKeyDown, idefaultValue}) => {
    return (
        <Row type="flex" justify="center">
            <Col xs={22} sm={22} md={16} lg={16} xl={14} xxl={14}>
            <Form.Item
                name={fieldName}
                label={iLabel}
                rules={[
                    {
                        required: true,
                        message: errMjs,
                    },
                ]}
                required
            >
                <Input
                    name={fieldName}
                    placeholder={iPlaceholder}
                    onChange={ihandleInputChange}
                    readOnly={iReadOnly}
                    onKeyPress={ionKeyPress}
                    onKeyDown={ionKeyDown}
                    defaultValue={idefaultValue}
                />
            </Form.Item>
            </Col>
        </Row>
    );
};

export default CustomInput;