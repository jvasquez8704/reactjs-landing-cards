import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from '../ach/UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { setPin, setAchAccount } from '../../actions/ach';
import { useForm } from '../../hooks/useForm';
import CustomInput from '../ui/form/CustomInput';

const ManagementPin = () => {

    const dispatch = useDispatch();
    const data = useSelector(({ ach, ui, auth }) => ({ ach, auth }));
    const { ach:info, auth } = data;
    const accounts = info.products ? info.products.productsItems : [];
    const types = info.cardTypes;
    const [{ pin , reason }, handleInputChange] = useForm({pin:'', reason: ''});
    const [account, setAccount] = useState('');
    const [card, setCard] = useState({});
    const [temp, setTemp] = useState('')

    const handleOnSubmit = e => {
        e.preventDefault();
        const { token } = info;
        const { identity } = auth;

        if (account === '') {
            dispatch(setError('Selecciona una tarjeta'));
            return;
        }

        if (reason === '') {
            dispatch(setError('Ingresa un motivo'));
            return;
        }

        if (pin === '') {
            dispatch(setError('Ingresa nuevo pin'));
            return;
        }

        dispatch(setPin(identity, token, card , pin)); 
    }

    const handleChangeCard = value => {
        const cardResult = accounts.filter((acc) => acc.product === value);
        if (cardResult && Array.isArray(cardResult) && cardResult.length === 1) {
          setCard(cardResult[0]);
        }
        dispatch(setAchAccount(value));
        setAccount(value);
    }

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError());      
    }

    const handleKeyPress = e => {
        if (e.target.name === 'pin' && temp.length > 3) {
            e.preventDefault();
            return;
        }

        if (e.target.name === 'pin' && isNaN(e.key)) {
            e.preventDefault();
            return;
        }
        let dataTemp = temp + e.key;
        e.target.name === 'pin' && setTemp(dataTemp);
    }
    
    const handleKeyDown = e => {
        let key = e.which || e.keyCode || e.charCode;
        // if (!validator.isNumeric(e.key)) {
        //     e.preventDefault();
        //     return;
        // }
        if(e.target.name === 'pin' && key === 8){
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
            onSubmit={handleOnSubmit}
        >
            <Form.Item name="info-item">
               <UserInfoTable info={info} />
            </Form.Item>

            {/* <CustomSelect
                fieldName="doc-type-item"
                iLabel="Tipo de Tarjeta"
                errMjs="Por favor selecciona tipo de tarjeta"
                iPlaceholder="Selecciona tipo de tarjeta"
                items={types}
                iHandleSelectChange={handleChangeType}
                irules={{
                    required: {
                        value: true,
                        message: 'Se ocupa el documento'
                    }
                }}
            /> */}
            
            <CustomSelect
                fieldName="account-item"
                iLabel="Selecciona una tarjeta"
                errMjs="Por favor selecciona una tarjeta"
                iPlaceholder="Selecciona una Tarjeta"
                items={accounts}
                iHandleSelectChange={handleChangeCard}
                irules={{
                    required: {
                        value: true,
                        message: 'Se ocupa la tarjeta'
                    }
                }}
            />

            <CustomInput fieldName="reason"
                iLabel="Motivo solicitud"
                errMjs="Por favor ingresa motivo"
                iPlaceholder="Ingresa motivo de solicitud"
                ihandleInputChange={handleInputChange}
            />

            <CustomInput fieldName="pin"
                iLabel="Número de Pin"
                errMjs="Por favor ingresa Pin"
                iPlaceholder="Sin espacios ni guiones"
                ihandleInputChange={handleInputChange}
                ionKeyPress={handleKeyPress}
                ionKeyDown={handleKeyDown}
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
        </Form>

    );
};

export default ManagementPin;