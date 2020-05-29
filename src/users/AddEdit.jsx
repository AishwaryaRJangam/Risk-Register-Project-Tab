import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = 0;
    const isAddMode = !id;
    
    const initialValues = {
        customer: '',
        projectName: '',
        projectManager: '',
        deliveryManager: '',
        projectStatus: '',
        startDate: '',
        endDate : ''
    };

    const validationSchema = Yup.object().shape({
            customer: Yup.string()
            .required('Risk Type is required'),

            projectName: Yup.string()
            .required('projectName is required'),

            projectManager: Yup.string()
            .required('projectManager is required'),

            deliveryManager: Yup.string()
            .required('Email is required'),

            projectStatus: Yup.string()
            .required('projectStatus is required'),

            startDate: Yup.string()
            .required('Age is required'),

            endDate: Yup.string()
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
                            
                            const fields = ['customer', 'projectName', 'projectManager', 'deliveryManager', 'projectStatus', 'startDate', 'endDate'];
                            fields.forEach(field => setFieldValue(field, user[field], false));
                            setUser(user);
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h3>Projects</h3>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label>Customer</label>
                                <Field name="customer" as="select" className={'form-control' + (errors.customer && touched.customer ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>
                                <ErrorMessage name="customer" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group col-md-3">
                                <label>Internal/External</label>
                                <Field name="projectName" as="select" className={'form-control' + (errors.projectName && touched.projectName ? ' is-invalid' : '')}>
                                <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>                                
                                <ErrorMessage name="projectName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Owner</label>
                                <Field name="projectManager" as="select" className={'form-control' + (errors.projectManager && touched.projectManager ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>                                
                                <ErrorMessage name="projectManager" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Severity</label>
                                <Field name="deliveryManager" as="select" className={'form-control' + (errors.deliveryManager && touched.deliveryManager ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>                                
                                <ErrorMessage name="deliveryManager" component="div" className="invalid-feedback" />                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            
                            <div className="form-group col-md-3">
                                <label>Priority</label>
                                <Field name="projectStatus" as="select" className={'form-control' + (errors.projectStatus && touched.projectStatus ? ' is-invalid' : '')}>
                                <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Field>
                                <ErrorMessage name="projectStatus" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Risk Raised Date</label>
                                <Field name="startDate" type="text" className={'form-control' + (errors.startDate && touched.startDate ? ' is-invalid' : '')} />
                                <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-md-3">
                            <label>Age</label>
                                <Field name="endDate" type="text" className={'form-control' + (errors.endDate && touched.endDate ? ' is-invalid' : '')} />
                                <ErrorMessage name="endDate" component="div" className="invalid-feedback" />                               <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                           
                        </div>
                      
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    ); 
}

export { AddEdit };