import React from 'react';
import { Row, Col } from 'antd';
import Tab from '../ui/Tab';

const Tabs = ({style, title, tabList, activeTabKey, onTabChange, className}) => {
    return (
        <div className={className || ""} style={style || null}>
            <div className="stc-main-title">
                <h1>{title}</h1>
            </div>
            <Row className="stc-head-tabs">
                {
                    tabList.map(item => (<Col key={item.key} xs={8} sm={8} md={12} lg={12} xl={6} xxl={4}>
                        <Tab key={item.key} id={item.key} image={item.img} desc={item.desc} getCurrentTab={onTabChange} />
                    </Col>))
                }
            </Row>
        </div>
    );
};

export default Tabs;