import React from 'react';
import { useDispatch } from 'react-redux'; 
import { Form, Button } from 'antd';

import { useForm } from '../../hooks/useForm';
import { verifyCustomer } from '../../actions/auth';
import CustomInput from '../ui/form/CustomInput';
import { updateStep } from '../../actions/ui';


const Verify = () => {

    const dispatch = useDispatch();
    const [{ identity }, handleInputChange] = useForm({
        identity:''
    });

    const handleLogin = e => {
        e.preventDefault();
        dispatch(verifyCustomer(identity));
    }


    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form"
            onSubmit={handleLogin}
        >
            <CustomInput fieldName="identity"
                iLabel="Número de identidad"
                errMjs="Por favor ingresa tu identidad"
                iPlaceholder="Sin espacios ni guiones"
                ihandleInputChange={handleInputChange}
            />

            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit">
                    Siguiente
                </Button>
            </Form.Item>
        </Form>

    );
};

export default Verify;