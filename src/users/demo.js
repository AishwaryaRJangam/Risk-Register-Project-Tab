import React from 'react';
import MaterialTable from 'material-table';
import { userService } from '@/_services';

export default function MaterialTableDemo() {
  const [users, setUsers] = React.useState([])

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
     startDate: user.startDate,
     endDate: user.endDate,
   })
   return data;
 });

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
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
                setState((prevState) => {
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
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
