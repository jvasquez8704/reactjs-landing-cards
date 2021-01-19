import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';

import { setError, unsetError, updateStep } from '../../actions/ui';
import { setUserInfo } from '../../actions/ach';
import { useForm } from '../../hooks/useForm';
import CustomInput from '../ui/form/CustomInput';

const InfoUpdater = () => {
    const dispatch = useDispatch();
    const [temp, setTemp] = useState('')
    const data = useSelector(({ ach, ui, auth }) => ({ ach, auth }));
    const { ach:info, auth } = data;
    const { customerCorePhone, customerCoreEmail } = info;
    const [ {address, workAddress, mobile, telephone, email },handleInputChange] = useForm({ address: '', workAddress: '',mobile: customerCorePhone,telephone: '', email: customerCoreEmail });

    const handleSubmit = e => {
        e.preventDefault();
        const { identity } = auth;
        const { token } = info;

        if (address === '') {
            dispatch(setError('Ingresa un domicilio'));
            return;
        }

        if (workAddress === '') {
            dispatch(setError('Ingresa una dirección de trabajo'));
            return;
        }

        if (mobile === '') {
            dispatch(setError('Ingresa telefono celular'));
            return;
        }

        if (telephone === '') {
            dispatch(setError('Ingresa telefono de casa'));
            return;
        }

        if (email === '') {
            dispatch(setError('Ingresa email'));
            return;
        }

        dispatch(setUserInfo(identity, token, {address, workAddress, mobile, telephone, email}));
    } 

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError());
    }

    const handleKeyPress = e => {
        if ((e.target.name === 'mobile' || e.target.name === 'telephone') && temp.length > 7) {
            e.preventDefault();
            return;
        }

        if ((e.target.name === 'mobile' || e.target.name === 'telephone') && isNaN(e.key)) {
            e.preventDefault();
            return;
        }
        let dataTemp = temp + e.key;
        (e.target.name === 'mobile' || e.target.name === 'telephone') && setTemp(dataTemp);
    }
    
    const handleKeyDown = e => {
        let key = e.which || e.keyCode || e.charCode;
        if((e.target.name === 'mobile' || e.target.name === 'telephone') && key === 8){
            let dataTemp = temp;
            if(dataTemp.length > 0){
                setTemp(dataTemp.slice(0, -1)); 
            }
        }    
    }

    return (
      <Form
        name="basic"
        layout="vertical"
        className="stc-form"
        onSubmit={handleSubmit}
      >
        <CustomInput
          fieldName="address"
          iLabel="Domicilio"
          errMjs="Por favor ingresa domicilio"
          iPlaceholder="Ingresa domicilio"
          ihandleInputChange={handleInputChange}
          ionKeyPress={handleKeyPress}
          ionKeyDown={handleKeyDown}
        />

        <CustomInput
          fieldName="workAddress"
          iLabel="Dirección de trabajo"
          errMjs="Por favor ingresa dirección de trabajo"
          iPlaceholder="Ingresa dirección de trabajo"
          ihandleInputChange={handleInputChange}
          ionKeyPress={handleKeyPress}
          ionKeyDown={handleKeyDown}
        />

        <CustomInput
          fieldName="mobile"
          iLabel="Telefono celular"
          errMjs="Por favor ingresa telefono celular"
          iPlaceholder="Ingresa telefono celular"
          ihandleInputChange={handleInputChange}
          ionKeyPress={handleKeyPress}
          ionKeyDown={handleKeyDown}
          idefaultValue={mobile}
        />

        <CustomInput
          fieldName="telephone"
          iLabel="Telefono de casa"
          errMjs="Por favor ingresa telefono de casa"
          iPlaceholder="Ingresa telefono de casa"
          ihandleInputChange={handleInputChange}
          ionKeyPress={handleKeyPress}
          ionKeyDown={handleKeyDown}
        />

        <CustomInput
          fieldName="email"
          iLabel="Correo electrónico"
          errMjs="Por favor ingresa correo electrónico"
          iPlaceholder="Ingresa correo electrónico"
          ihandleInputChange={handleInputChange}
          ionKeyPress={handleKeyPress}
          ionKeyDown={handleKeyDown}
          idefaultValue={email}
        />

        <Form.Item>
          <Button type="primary" className="stc-button" htmlType="submit">
            Siguiente
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            className="btn stc-button-default"
            htmlType="button"
            onClick={handleBack}
          >
            Atrás
          </Button>
        </Form.Item>

        <Form.Item name="normal-message">
          <p>
            Nota: Recuerda que los datos de correo y teléfono son los que
            anteriormente le has proporcionado a Banco Atlántida para
            comunicarse contigo.
          </p>
        </Form.Item>
      </Form>
    );
};

export default InfoUpdater;