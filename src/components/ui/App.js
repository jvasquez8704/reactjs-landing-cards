import React from 'react';
import { Layout } from 'antd';

import TabsCard from './TabsCard';
import logo from '../../res/img/logo.svg';
import CustomFooter from './CustomFooter';

const { Header, Footer, Content } = Layout;

const MainContent = () => {
    return (
        <Layout>
            <Header className="stc-header-top-row" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <img alt="Logo Banco Atlantida" className="stc-landing-header" src={logo}/>
            </Header>
            <Content>
                <TabsCard />
            </Content>
            <Footer>
                <CustomFooter/>
            </Footer>
        </Layout>
    );
};

export default MainContent;