import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

import App from './components/ui/App';

const SinglePage = () => {

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default SinglePage;