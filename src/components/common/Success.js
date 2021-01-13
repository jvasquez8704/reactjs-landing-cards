import React from 'react';
import { useDispatch } from 'react-redux'; 
import { Form, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { unsetError, updateStep } from '../../actions/ui';


const Success = () => {

    const dispatch = useDispatch();

    const restartApp = e => {
        e.preventDefault();
        dispatch(updateStep(0));
        dispatch(unsetError());
    }

    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form"
            onSubmit={restartApp}
        >
            <Form.Item
                name="success-icon"
            >
               <CheckCircleFilled style={{ fontSize: '8rem', color: 'green' }} />
            </Form.Item> 
            
            <Form.Item
                name="normal-message"
            >
               <p>
                    Tu usuario ha sido desbloqueado con éxito.
               </p>
            </Form.Item>

            <Form.Item
                name="normal-message"
            >
               <p>
                   <strong>
                        Ahora estás listo para realizar más de 400 transacciones en cualquier momento y en cualquier lugar.
                   </strong>
               </p>
            </Form.Item>

            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit">
                    Inicio
                </Button>
            </Form.Item>
        </Form>

    );
};

export default Success;