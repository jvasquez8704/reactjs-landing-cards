import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
//import { useForm as validatorForm } from "react-hook-form";

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from '../ach/UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { getAgreement, setAchAccount } from '../../actions/ach';
import { useForm } from '../../hooks/useForm';
import CustomInput from '../ui/form/CustomInput';
//import CustomDate from '../ui/form/CustomDate';
//import { getKeys, groupByYear } from '../../helpers/util';

const ManagementPin = () => {

    const dispatch = useDispatch();
    const data = useSelector(({ ach, ui }) => ({ ach, download: ui.download }));
    const { ach:info, download } = data;
    const accounts = info.products ? info.products.productsItems : [];
    const types = info.cardTypes;
    const reasonsBlock = info.reasonBlock;
    const [{ desc, pin }, handleInputChange] = useForm({
        desc:'', pin:''
    });
    // const periods = info.periods ? groupByYear(info.periods.periodsItems) : [];
    // const periodKeys = getKeys(periods);
    const [account, setAccount] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [type, setType] = useState('');

    //const { register, handleSubmit, errors , control } = validatorForm();

    const handleOnSubmit = e => {
        e.preventDefault();
        const { token, customerOCBUser } = info;
        // if (year === '') {
        //     dispatch(setError('Selecciona año'));
        //     return;
        // }

        // if (month === '') {
        //     dispatch(setError('Selecciona mes'));
        //     return;
        // }

        // if (type === '') {
        //     dispatch(setError('Selecciona tipo de tarjeta'));
        //     return;
        // }

        // if (account === '') {
        //     dispatch(setError('Selecciona una tarjeta'));
        //     return;
        // }

        //dispatch(getAgreement(token, account , customerOCBUser, year, month , type)); 
        dispatch(updateStep(3));
    }

    const handleChange = value => {
        dispatch(setAchAccount(value));
        setAccount(value);
    }

    const handleChangeType = value => {
        setType(value);
    }
    
    const handleClick = () => {
        dispatch(unsetError());      
        window.open(info.urlChecks, "_blank");    
    }

    const handleBack = () => {
        //dispatch(activeDownload(false));
        dispatch(updateStep(0));
        dispatch(unsetError());      
    }
    
    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form"
            //onSubmit={handleSubmit(handleOnSubmit)}
            onSubmit={handleOnSubmit}
        >
            <Form.Item name="info-item">
               <UserInfoTable info={info} />
            </Form.Item>

            <CustomSelect
                fieldName="doc-type-item"
                iLabel="Tipo de Tarjeta"
                errMjs="Por favor selecciona tipo de tarjeta"
                iPlaceholder="Selecciona tipo de tarjeta"
                items={types}
                iHandleSelectChange={handleChangeType}
                //icontrol={control}
                irules={{
                    required: {
                        value: true,
                        message: 'Se ocupa el documento'
                    }
                }}
            />
            
            <CustomSelect
                fieldName="account-item"
                iLabel="Tarjeta a Bloquear"
                errMjs="Por favor selecciona una tarjeta"
                iPlaceholder="Selecciona tarjeta a bloquear"
                items={accounts}
                iHandleSelectChange={handleChange}
                //icontrol={control}
                irules={{
                    required: {
                        value: true,
                        message: 'Se ocupa la tarjeta'
                    }
                }}
            />

            <CustomInput fieldName="desc"
                iLabel="Motivo de Bloqueo"
                errMjs="Por favor ingresa motivo"
                iPlaceholder="Ingresa motivo de bloqueo"
                ihandleInputChange={handleInputChange}
            />

            <CustomSelect
                fieldName="block-type-item"
                iLabel="Tipo de Bloqueo"
                errMjs="Por favor selecciona tipo de bloqueo"
                iPlaceholder="Selecciona un tipo de bloqueo"
                items={reasonsBlock}
                iHandleSelectChange={handleChange}
                //icontrol={control}
                irules={{
                    required: {
                        value: true,
                        message: 'Se ocupa la tarjeta'
                    }
                }}
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