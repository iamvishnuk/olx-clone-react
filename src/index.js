import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context';
import Context from './store/Context';
import { FireBase } from './firebase/config';
import Post from './store/PostContext';

ReactDOM.render(
    <FirebaseContext.Provider value={{ FireBase }}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>
    , document.getElementById('root')
);
