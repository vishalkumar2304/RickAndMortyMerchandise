import React from 'react';
import {Route, Switch} from 'react-router-dom';
import routes from './routes';

const App = () => {
    return(
        <Switch>
            {routes.map((route, ind)=><Route key={ind} {...route}/>)}
        </Switch>
    )
}

export default App;