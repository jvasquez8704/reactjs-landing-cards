import React from 'react';
import { useSelector } from 'react-redux';
import { Steps, Spin, Card, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const StepScreen = ({ steps, desc }) => {
    const { Step } = Steps;
    const { step: current, loading, err } = useSelector(({ ui }) => ui);
    
    /**
     useEffect(() => {
        console.log('Capturando error => ', err);
    }, [err]);

    const onChange = current => {
        console.log(current);
    };
     */
    /*General Loader*/
    const antIcon = <LoadingOutlined style={{ fontSize: 24 , color:'red'}} spin />

    return (
        <div className="stc-content">
            <div className="stc-card-title">
                <Title level={3}>{desc}</Title>
            </div>
            <Card title="Ingresa tu identidad" className="stc-card-widget">
                <Steps
                    type="navigation"
                    current={current}
                    className="site-navigation-steps"
                    status={`${ err ? 'error': 'process'}`}
                >
                    {steps && steps.map( ( item, idx ) => (
                        <Step key={item.key} title={`${idx === current && err ? err : ''}`} />
                    ))}

                </Steps>
                <Spin indicator={antIcon} spinning={loading} >
                    {steps && steps[current].content}
                </Spin>
            </Card>
        </div>
    );
};

export default StepScreen;