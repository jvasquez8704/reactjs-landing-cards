import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


import { setTab, updateStep } from '../../actions/ui';

import img1 from '../../res/img/unlock.svg';
import img2 from '../../res/img/ach.svg';
import img3 from '../../res/img/reset.svg';

import Content from './Content';
import Verify from '../common/Verify';
import Success from '../common/Success';
import Unlock from '../unlock/UnlockUser';
import Tabs from '../custom/Tabs';
import ManagementPin from '../service/ManagementPin';
import PIBlocker from '../service/PIBlocker';
import LimitUpdater from '../service/LimitUpdater';
import InfoUpdater from '../service/InfoUpdater';
import QueryMovements from '../service/QueryMovements';

const TabsCard = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    key: 'tab1',
    description: 'Asignación/Cambio de PIN'
  });

  const { key, description } = state;

  const tabList = [
    {
      key: 'tab1',
      img: img1,
      desc: "Asignación/Cambio de PIN"
    },
    {
      key: 'tab2',
      img: img2,
      desc: "Actualización de Datos"
    },
    {
      key: 'tab3',
      img: img3,
      desc: "Bloqueo/Desbloqueo Tarjeta"
    },
    {
      key: 'tab4',
      img: img3,
      desc: "Límite de Crédito"
    },
    {
      key: 'tab5',
      img: img3,
      desc: "Consulta de Movimientos"
    }
  ];

  const unlockJourney = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'unlock',
      content: <Unlock />,
    },
    {
      key: 'pin',
      content: <ManagementPin />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const infoJourney = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'auth',
      content: <Unlock />,
    },
    {
      key: 'unlock',
      content: <InfoUpdater />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const blockJourney = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'reset',
      content: <Unlock />,
    },
    {
      key: 'BlockPI',
       content: <PIBlocker />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const limitUpdater = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'reset',
      content: <Unlock />,
    },
    {
      key: 'limitUpdater',
      content: <LimitUpdater />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const queryMovements = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'reset',
      content: <Unlock />,
    },
    {
      key: 'queryMovements',
       content: <PIBlocker />,
      // content: <QueryMovements />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const journeys = {
    tab1: unlockJourney,
    tab2: infoJourney,
    tab3: blockJourney,
    tab4: limitUpdater,
    tab5: queryMovements
  };
  
  const onTabChange = (key, description) => {
    const tab = parseInt(key.replace('tab',''));
    dispatch(updateStep(0));//restar journey 
    dispatch(setTab(tab));
    setState({
      ...state,
      key,
      description
    });
  };

  return (
    <div>
      <Tabs
        title={"Gestiones Atlántida"}
        className="stc-tabs ant-row ant-row-center ant-row-middle"
        tabList={tabList}
        onTabChange={onTabChange}
      >
      </Tabs>
      <Content steps={journeys[key]} desc={description} />
    </div>
  );
};

export default TabsCard;