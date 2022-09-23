import React from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './routes/Form';
import List from './routes/List';


import {
    createBrowserRouter,
    RouterProvider,
    useParams,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <List/>,
    },
    {
        path: "/element/:id",
        element: <Form/>,
    },
    {
        path: "/add",
        element: <Form/>,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
