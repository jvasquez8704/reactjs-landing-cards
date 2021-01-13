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
    const queryTypes = info.queryTypes;
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
                iLabel="Tarjeta"
                errMjs="Por favor selecciona una tarjeta"
                iPlaceholder="Selecciona tarjeta"
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

            <CustomSelect
                fieldName="query-type-item"
                iLabel="Tipo de Consulta"
                errMjs="Por favor selecciona tipo de consulta"
                iPlaceholder="Selecciona un tipo de consulta"
                items={queryTypes}
                iHandleSelectChange={handleChange}
                //icontrol={control}
                irules={{
                    required: {
                        value: true,
                        message: 'Se ocupa la tarjeta'
                    }
                }}
            />

            <CustomInput fieldName="available-amount"
                iLabel="Monto disponible"
                errMjs="Por favor ingresa monto"
                iPlaceholder="200,000.00 HND"
                ihandleInputChange={handleInputChange}
                ireadOnly={true}
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