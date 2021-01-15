import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Content from './Content';

import img1 from '../../res/img/unlock.svg';
import img2 from '../../res/img/ach.svg';
import img3 from '../../res/img/reset.svg';

import Verify from '../common/Verify';
import Success from '../common/Success';
import Unlock from '../unlock/UnlockUser';
import EnableACH from '../ach/EnableACH';
import AgreementACH from '../ach/AgreementACH';
import ResetPassword from '../reset/ResetPassword';

import { setTab, updateStep } from '../../actions/ui';
import Tabs from '../custom/Tabs';
import ManagementPin from '../service/ManagementPin';
import PIBlocker from '../service/PIBlocker';
import LimitUpdater from '../service/LimitUpdater';
import QueryMovements from '../service/QueryMovements';

const TabsCard = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    key: 'tab1',
    description: 'Asignación / Cambio de PIN'
  });

  const { key, description } = state;

  const tabList = [
    {
      key: 'tab1',
      img: img1,
      desc: "Asignación / Cambio de PIN"
    },
    {
      key: 'tab2',
      img: img2,
      desc: "Actualización de Datos"
    },
    {
      key: 'tab3',
      img: img3,
      desc: "Bloqueo de Tarjeta"
    },
    {
      key: 'tab4',
      img: img3,
      // desc: "Modificación de Límite de Crédito"
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

  const achJourney = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'unlock',
      content: <Unlock />,
    },
    {
      key: 'agreement',
      content: <EnableACH />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const resetJourney = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'reset',
      // content: <ResetPassword />,
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
       content: <PIBlocker />,
      // content: <LimitUpdater />,
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
    tab2: achJourney,
    tab3: resetJourney,
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