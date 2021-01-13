import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'antd';

import { useForm } from '../../hooks/useForm';
import { unsetError, updateStep } from '../../actions/ui';
import { resetUserPassword } from '../../actions/user';
import CustomInput from '../ui/form/CustomInput';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const identity = useSelector(({ auth }) => auth.identity);
    const [{ username, token, telephone, email }, handleInputChange] = useForm({
        username: '',
        token: '',
        telephone:'',
        email:''
    });

    const handleLogin = e => {
        
        e.preventDefault();   
        dispatch(resetUserPassword(identity, username, token, email, telephone));
        
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
            <CustomInput fieldName="telephone"
                iLabel="Teléfono"
                errMjs="Ingresa tu teléfono"
                iPlaceholder="Ingresa tu teléfono"
                ihandleInputChange={handleInputChange}
            /> 
            <CustomInput fieldName="email"
                iLabel="Correo Electrónico"
                errMjs="Por favor ingresa tu correo electrónico"
                iPlaceholder="Ingresa tu correo electrónico"
                ihandleInputChange={handleInputChange}
            />
            
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

            <Form.Item
                name="normal-message"
            >
               <p>
                    Nota: Recuerda que los datos de correo y teléfono son los que anteriormente le has proporcionado a Banco Atlántida para comunicarse contigo.
               </p>
            </Form.Item>
        </Form>
    );
};

export default ResetPassword;