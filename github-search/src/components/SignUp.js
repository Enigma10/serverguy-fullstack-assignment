import React from "react";
import { Button, Input, Form, Card } from "antd";
import { withFormik, Form as FormikForm, Field as FormikField, connect, getIn } from "formik";
import axios from 'axios';
import * as Yup from 'yup';

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
        <Card title="Sign Up" bordered={true} style={{ width: 300 }}>
          <label className="m-1">Username</label>
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
          <label className="m-1">email</label>
          <FormItem>
            <FormikField
              name="email"
              render={({ field }) => 
              <Input
              size="large"
              {...field}
              />
            }
            />
            <CustomeErrorMessage {...props} name="email" />
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
            <Button htmlType="submit" size="large" type="primary" disabled={isSubmitting}>
              Submit
            </Button>
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
      email,
      password,
    }) { 
    return {
      username,
      email,
      password
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('username or email is required'),
    password: Yup.string().min(8).required('Password is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),

  }),
  handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
    axios.post(`http://localhost:3000/user/signup`, {
      ...values
    })
    .then(res => {
      setSubmitting(false);
      props.history.push('/')
    })
  }
})(InnerForm);
