import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button, Checkbox } from 'antd';

import { setError, unsetError, updateStep } from '../../actions/ui';
import { getEnroll } from '../../actions/ach';

const AgreementACH = () => {

    const dispatch = useDispatch();
    const { token, detail, selectedAccount } = useSelector(({ ach }) =>  ach );
    const [approved, setApproved] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Approved: ', approved, 'selected Acc: ', selectedAccount);
        if (!approved) {
            dispatch(setError('Debes aceptar los términos y condiciones'));
            return;
        }
        dispatch(getEnroll(token, selectedAccount)); 
    }

    const handleChange = e => {
        setApproved(e.target.checked);
    }

    
    const handleBack = () => {
        dispatch(updateStep(2));
        dispatch(unsetError());      
    }
    
    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form"
            onSubmit={handleSubmit}
        >
            <Form.Item name="info-item">
                <p className="text-agreement" >{detail}</p>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Checkbox onChange={handleChange}>Acepta términos</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit">
                    Siguiente
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="default" className="btn stc-button-default" htmlType="button" onClick={handleBack}>
                    Atrás
                </Button>
            </Form.Item>
        </Form>

    );
};

export default AgreementACH;