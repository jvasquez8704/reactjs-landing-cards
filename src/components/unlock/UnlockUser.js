import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'antd';

import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';
import { unsetError, updateStep } from '../../actions/ui';
import { getUserInfo } from '../../actions/ach';
import CustomInput from '../ui/form/CustomInput';

const UnlockUser = () => {

    const tab = useSelector( ({ui}) => ui.tab);
    const dispatch = useDispatch();
    const identity = useSelector(({ auth }) => auth.identity);
    const [{ username, token }, handleInputChange] = useForm({
        username: '',
        token: ''
    });

    const handleLogin = e => {
        e.preventDefault();
        // if (tab === 1) {
        //     dispatch(startLogin(identity, username, token));
        // } if (tab === 2) {
        //     dispatch(getUserInfo(identity, username, token));
        // } else {
        //     console.log(`You are un tab ${tab}, no action for Unlock User`);
        // }
        dispatch(getUserInfo(identity, username, token));
        //dispatch(updateStep(2));
    }

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError());
    }

    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form"
            onSubmit={handleLogin}
        >
            <CustomInput fieldName="username"
                iLabel="Usuario Atlántida Online"
                errMjs="Por favor ingresa tu usuario"
                iPlaceholder="Ingresa tu usuarios"
                ihandleInputChange={handleInputChange}
            />
            <CustomInput fieldName="token"
                iLabel="Token"
                errMjs="Por favor ingresa tu token"
                iPlaceholder="Ingresa tu Token"
                ihandleInputChange={handleInputChange}
            />
            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit" style={{background:'#d9272e'}}>
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

export default UnlockUser;