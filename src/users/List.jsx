import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AddEdit } from './AddEdit';
import { Table,Row, Col, Button, Radio, Divider } from 'antd';
import { userService } from '@/_services';
import {useHistory} from 'react-router';
import MaterialTable from 'material-table';

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  
function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);
    const columns = [
        // {
        //   title: 'Customer',
        //   field: 'customer',
        // },
        {
          title: 'Project Name',
          field: 'projectName'
        },
        {
          title: 'Project Manager',
          field: 'projectManager'
        },
        {
          title: 'Week End Date',
          field: 'startDate'
        },
        // {
        //   title: 'Delivery Manager',
        //   field: 'deliveryManager'
        // },
        {
            title: 'Overall Project Status',
            field: 'projectStatus'
          },
         
          // {
          //   title: 'End Date',
          //   field: 'endDate'
          // },
      ];
    const data = [{
      }];
    users.map((user) => {
        data.push({
         key: user.id,
         customer: user.customer,
         projectName: user.projectName,
         projectManager: user.projectManager,
         deliveryManager: user.deliveryManager,
         projectStatus: user.projectStatus,
         startDate: user.startDate.toLocaleString(),
         endDate: user.endDate,
       })
       return data;
     });
     const handleClick = () => {
        history.push('.')
      }
    
    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

        const [selectionType, setSelectionType] = useState('checkbox');
      
    return (
        <div>
            <AddEdit />
          <Divider />  
            <Link to="/add-risk" className="btn btn-sm btn-success mb-2">Add User</Link>

{/* 
            <Radio.Group
             onChange={({ target: { value } }) => {
                 setSelectionType(value);
                       }}
                value={selectionType}
          >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider /> */}
      {/* <Row gutter={[40, 0]}>
          <Col span={18}>
            <h2>
            User List
            </h2>
            </Col>
          <Col span={6}>
          </Col>
          
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={24}>
                <Table 
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                          }}
                columns={columns} 
             dataSource={data} />
        </Col>
        </Row>
        </div> */}
         <MaterialTable
      title="WSR/Project Tab"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setUsers((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setUsers((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setUsers((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
    </div>
    );
}

export { List };
