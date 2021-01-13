import React from 'react';
import { Col, Form, Row, Select } from 'antd';

const { Option } = Select;

const CustomSelect = ({fieldName, iLabel, errMjs, iPlaceholder, items, getAccount, iHandleSelectChange }) => {
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
                    className="noah"
                    required
                >
                    <Select defaultValue={iPlaceholder} onChange={iHandleSelectChange}>
                        {items && items.map(item => <Option key={item.product} value={item.product}>{item.mask}</Option>)}
                    </Select>
                </Form.Item>
            </Col>
        </Row>
    );
};

export default CustomSelect;