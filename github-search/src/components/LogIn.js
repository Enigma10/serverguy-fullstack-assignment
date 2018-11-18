import React from "react";
import { Button, Input, Form, Card } from "antd";
import { withFormik, Form as FormikForm, Field as FormikField, connect, getIn } from "formik";
import axios from 'axios';
import * as Yup from 'yup';
import { Link } from 'react-router-dom'


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'text/plain;charset=utf-8';
axios.defaults.withCredentials = true


// import './NewClaim.css'

const FormItem = Form.Item;
const CustomeErrorMessage1 = props => {
  const error = getIn(props.formik.errors, props.name);
  const touch = getIn(props.formik.touched, props.name);
  return touch && error ? <p style={{color: 'red'}}>{error}</p> : null;
};
const CustomeErrorMessage = connect(CustomeErrorMessage1);

const InnerForm = ({
  props,
  values,
  errors,
  touched,
  setFieldTouched,
  setFieldValue,
  isSubmitting,
  handleSubmit
}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '20vh'}}>
      <FormikForm onSubmit={handleSubmit}>
        <Card title="Login" bordered={true} style={{ width: 300 }}>
          <label className="m-1">Username Or Email</label>
          <FormItem>
            <FormikField
              name="username"
              render={({ field }) => 
              <Input
              size="large"
              {...field}
              />
            }
            />
            <CustomeErrorMessage {...props} name="username" />
          </FormItem>
          <label className="m-1">password</label>
          <FormItem>
            <FormikField
              name="password"
              render={({ field }) => (
                <Input
                type="password"
                size="large"                
                {...field} 
                />
              )}
            />
            <CustomeErrorMessage {...props} name="password" />
          </FormItem>
          <FormItem>
            <Button style={{margin: '5px 5px 0 5px'}} htmlType="submit" size="large" type="primary" disabled={isSubmitting}>
              Submit
            </Button>
            <Link to="/sign-up">
              <Button style={{margin: '5px 5px 0 5px'}}  size="large" type="primary">
                Sign Up
              </Button>
            </Link>
            <br></br>
            <a href="http://localhost:3000/auth/google-login">
              <Button size="large" type="primary" style={{margin: '5px 5px 0 5px'}}>
                Google Login
              </Button>
            </a>
            <br></br>
            <a href="http://localhost:3000/auth/facebook-login">
              <Button  style={{margin: '5px 5px 0 5px'}} size="large" type="primary">
                Facebook Login
              </Button>
            </a>
            <br></br>
          </FormItem>
        </Card>
      </FormikForm>
    </div>
  );
};

// const currentTime = moment(new Date().getTime).format('DD-MM-YYYY');
export default withFormik({
    mapPropsToValues({ 
      username,
      password,
    }) { 
    return {
      username,
      password
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('username or email is required'),
    password: Yup.string().min(8).required('Password is required'),
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting, prop }) {
    axios.post(`auth/login`, {
      ...values
    })
    .then(res => {
      setSubmitting(false);
      props.history.push('/projects')
    })
  }
})(InnerForm);
