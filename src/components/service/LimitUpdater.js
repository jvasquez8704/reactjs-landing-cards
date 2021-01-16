import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from '../ach/UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { setLimitCard, setAchAccount } from '../../actions/ach';
import { useForm } from '../../hooks/useForm';
import CustomInput from '../ui/form/CustomInput';

const ManagementPin = () => {

    const dispatch = useDispatch();
    const data = useSelector(({ ach, ui, auth }) => ({ ach, download: ui.download, auth }));
    const { ach:info, download, auth } = data;
    const accounts = info.products ? info.products.productsItems : [];
    const types = info.cardTypes;
    const reasonUpdateLimit = info.reasonUpdateLimit;
    const [{ amount }, handleInputChange] = useForm({amount:''});
    const [account, setAccount] = useState('');
    const [card, setCard] = useState({});
    const [type, setType] = useState('');
    const [reason, setReason] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        const { identity } = auth;
        const { token } = info;

        if (account === '') {
            dispatch(setError('Selecciona una tarjeta'));
            return;
        }

        if (reason === '') {
            dispatch(setError('Ingresa un motivo'));
            return;
        }

        if (amount === '') {
            dispatch(setError('Ingresa nuevo limite'));
            return;
        }

        dispatch(setLimitCard(identity, token, card, amount));
    }
    
    const handleChangeReason = value => {
        setReason(value);
        console.log('Reason ',value);

    }

    const handleChangeCard = value => {
        const cardResult = accounts.filter((acc) => acc.product === value);
        if (cardResult && Array.isArray(cardResult) && cardResult.length === 1) {
          setCard(cardResult[0]);
        }
        dispatch(setAchAccount(value));
        setAccount(value);
    }
    
    const handleClick = () => {
        dispatch(unsetError());      
        window.open(info.urlChecks, "_blank");    
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
            onSubmit={handleSubmit}
        >
            <Form.Item name="info-item">
               <UserInfoTable info={info} />
            </Form.Item>
            
            <CustomSelect
                fieldName="account-item"
                iLabel="Tarjeta"
                errMjs="Por favor selecciona una tarjeta"
                iPlaceholder="Selecciona tarjeta a bloquear"
                items={accounts}
                iHandleSelectChange={handleChangeCard}
                irules={{
                    required: {
                        value: true,
                        message: 'Se ocupa la tarjeta'
                    }
                }}
            />

            <CustomSelect
                fieldName="reason-update-item"
                iLabel="Motivo"
                errMjs="Por favor selecciona un motivo"
                iPlaceholder="Selecciona un motivo"
                items={reasonUpdateLimit}
                iHandleSelectChange={handleChangeReason}
                irules={{
                    required: {
                        value: true,
                        message: 'Se ocupa la tarjeta'
                    }
                }}
            />

            <CustomInput fieldName="amount"
                iLabel="Monto"
                errMjs="Por favor digita monto"
                iPlaceholder="Ingresa un monto"
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
        </Form>

    );
};

export default ManagementPin;