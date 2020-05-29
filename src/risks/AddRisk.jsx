import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { userService, alertService } from '@/services';

function AddRisk({ history }) {
    const { id } = 0;
    const isAddMode = !id;
    
    const initialValues = {
        riskType: '',
        internal: '',
        owner: '',
        severity: '',
        priority: '',
        riskRaisedDate: '',
        age : '',
        status : ''
    };

    const validationSchema = Yup.object().shape({
             riskType: Yup.string()
            .required('Risk Type is required'),

            prointernaljectName: Yup.string()
            .required('Internal/External is required'),

            owner: Yup.string()
            .required('Owner is required'),

            severity: Yup.string()
            .required('Severity is required'),

            priority: Yup.string()
            .required('Priority is required'),

            riskRaisedDate: Yup.string()
            .required('Risk Raised Date is required'),

            age: Yup.string()
            .required('Age is required'),

            status: Yup.string()
            .required('Status is required'),
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createUser(fields, setSubmitting);
        } else {
            updateUser(id, fields, setSubmitting);
        }
    }

    function createUser(fields, setSubmitting) {
        userService.create(fields)
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(() => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateUser(id, fields, setSubmitting) {
        userService.update(id, fields)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                const [user, setUser] = useState({});
                const [showPassword, setShowPassword] = useState(false);

                
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        userService.getById(id).then(user => {
          
                            const fields =
                             ['riskType', 'internal' ,'owner', 'severity', 'priority',
                              'riskRaisedDate', 'age', 'status'];
                            fields.forEach(field => setFieldValue(field, user[field], false));
                            setUser(user);
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h4>Risks</h4>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>Risk Type</label>
                                <Field name="riskType" as="select" className={'form-control' + (errors.riskType && touched.riskType ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>
                                <ErrorMessage name="riskType" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group col-md-4">
                                <label>Internal/External</label>
                                <Field name="internal" as="select" className={'form-control' + (errors.internal && touched.internal ? ' is-invalid' : '')}>
                                <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>                                
                                <ErrorMessage name="internal" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Owner</label>
                                <Field name="owner" as="select" className={'form-control' + (errors.owner && touched.owner ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>                                
                                <ErrorMessage name="owner" component="div" className="invalid-feedback" />
                            </div>
                            </div>
                        <div className="form-row">

                            <div className="form-group col-md-4">
                                <label>Severity</label>
                                <Field name="severity" as="select" className={'form-control' + (errors.severity && touched.severity ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>                                
                                <ErrorMessage name="severity" component="div" className="invalid-feedback" />
                            </div>
                                                    
                            <div className="form-group col-md-4">
                                <label>Priority</label>
                                <Field name="priority" as="select" className={'form-control' + (errors.priority && touched.priority ? ' is-invalid' : '')}>
                                <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>
                                <ErrorMessage name="priority" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Risk Raised Date</label>
                                <Field name="riskRaisedDate" type="text" className={'form-control' + (errors.riskRaisedDate && touched.riskRaisedDate ? ' is-invalid' : '')} />
                                <ErrorMessage name="riskRaisedDate" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">

                            <div className="form-group col-md-4">
                            <label>Age</label>
                                <Field name="age" type="text" className={'form-control' + (errors.age && touched.age ? ' is-invalid' : '')} />
                                <ErrorMessage name="age" component="div" className="invalid-feedback" />                               <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-md-4">
                            <label>Status</label>
                                <Field name="status" type="text" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')} />
                                <ErrorMessage name="status" component="div" className="invalid-feedback" />                               <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                           
                        </div>
                      
                        <div className="form-group">
                            <button type="submit" style={{marginBottom: "20px"}} disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                +
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    ); 
}

export { AddRisk };