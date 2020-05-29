import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '@/services';

function List({ match }) {
    // const { path } = match;
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <div className="container box">
                    {users && users.map(user =>
                        <div key={user.id}>
                            <div className="row">
                                <div className="col-md-4">{user.riskType}</div>
                                <div className="col-md-4">{user.internal}</div>
                                 <div className="col-md-4">{user.owner}</div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">{user.severity}</div>
                                <div className="col-md-4">{user.priority}</div>
                                <div className="col-md-4">{user.riskRaisedDate}</div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">{user.age}</div>
                                <div className="col-md-4">{user.status}</div>
                            </div>
                            <div className="col-md-12" style={{ whiteSpace: 'nowrap' }}>
                                {/* <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link> */}
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </div>
                        </div>
                    )}
                    {!users &&
                        <div>
                            <div colSpan="12" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </div>
                        </div>
                    }
                    {users && !users.length &&
                        <div>
                            <div colSpan="12" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </div>
                        </div>
                    }
               
        </div>
    );
}

export { List };