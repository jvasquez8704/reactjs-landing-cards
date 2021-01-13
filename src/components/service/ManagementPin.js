import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
//import { useForm as validatorForm } from "react-hook-form";

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from '../ach/UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { getAgreement, getUserInfo, setAchAccount } from '../../actions/ach';
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
                iLabel="Selecciona una tarjeta"
                errMjs="Por favor selecciona una tarjeta"
                iPlaceholder="Selecciona una Tarjeta"
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
            <Form.Item>
                {/* <a href="https://qas.bancatlan.hn/pdf/comunicado-truncamiento-cheques.pdf" target="_blank" rel="noopener noreferrer" style={{color:'#d9272e'}}>¿ Que es un cheque Truncado ?</a> */}
                {/* <a href="https://i.picsum.photos/id/530/200/300.jpg?hmac=pl2pzOmYOiMa6E_Ddf_SFQVGjDvmZ1xgj-JznVHuUsg" target="_blank" rel="noopener noreferrer" style={{color:'#d9272e'}}>¿ Que es un cheque Truncado ?</a> */}
                {/* <a href="http://homepages.inf.ed.ac.uk/neilb/TestWordDoc.doc" rel="noopener noreferrer" style={{color:'#d9272e'}}>¿ Que es un cheque Truncado ?</a> */}
                {/* <a href="https://www.cmu.edu/blackboard/files/evaluate/tests-example.xls" rel="noopener noreferrer" style={{color:'#d9272e'}}>¿ Que es un cheque Truncado ?</a> */}
            </Form.Item>
        </Form>

    );
};

export default ManagementPin;