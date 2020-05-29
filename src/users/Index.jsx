import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Risks } from '../risks/Risks';

import { List } from './List';

function Users({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path="/add-risk" component={Risks} />
            {/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
        </Switch>
    );
}

export { Users };