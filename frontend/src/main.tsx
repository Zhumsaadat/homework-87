import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {persistor, store} from './app/store.ts';
import {PersistGate} from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
