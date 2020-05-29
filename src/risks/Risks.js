import React from 'react';
import { UploadFile } from './UploadFile';
import { render } from 'react-dom';
import { AddRisk } from './AddRisk';
import { Divider } from 'antd';
import { List } from './List';

function Risks({ history, match }) {
    const { id } = match.params;
    return(
            <div>
            <div className="test2"> <UploadFile /></div>
             <div className="test1"> <AddRisk /></div>
             <Divider />

             <div className="test1"> <List /></div>

             

          </div>
        );
    
}

export {Risks};
