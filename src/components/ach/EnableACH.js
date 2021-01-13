import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from './UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { getAgreement, setAchAccount } from '../../actions/ach';

const EnableACH = () => {

    const dispatch = useDispatch();
    const info = useSelector(({ ach }) =>  ach );
    const accounts = info.products ? info.products.productsItems : [];
    const [account, setAccount] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const { token } = info;
        // if (account === '') {
        //     dispatch(setError('Selecciona una cuenta...'));
        //     return;
        // }
        //dispatch(getAgreement(token, account)); 
        dispatch(updateStep(3)); 
    }

    const handleChange = value => {
        dispatch(setAchAccount(value));
        setAccount(value);
    }
    
    const handleBack = () => {
        dispatch(updateStep(1));
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
            
            {/* <CustomSelect
                fieldName="account-item"
                iLabel="Selecciona una cuenta"
                errMjs="Por favor seleccione una cuenta"
                iPlaceholder="Seleccione una Cuenta"
                items={accounts}
                iHandleSelectChange={handleChange}
            /> */}
            
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

export default EnableACH;