import React from 'react';
import styles from './App.less';
import Input from './components/Input/Input';
import { Formik } from 'formik';
import { CloseCircleTwoTone } from '@ant-design/icons';

class App extends React.Component {
  state = {
    emailError: '',
    passwordError: '',
    showError: false,
  };

  setErrors = (error, toValue) => {
    this.setState({
      [toValue]: error,
    });
  };

  setShowErr = (val) => {
    this.setState({
      showError: val,
    });
  };

  render() {
    return (
      <div className={styles.main}>
        {this.state.showError &&
        (this.state.emailError || this.state.passwordError) ? (
          <div className={styles.notification}>
            <div className={styles.notificationText}>
              <p>
                {this.state.emailError ? `❌ ${this.state.emailError}` : null}
              </p>
              <p>
                {this.state.passwordError
                  ? `❌ ${this.state.passwordError}`
                  : null}
              </p>
            </div>
            <CloseCircleTwoTone
              className={styles.closeIcon}
              style={{ fontSize: '0.8rem' }}
              twoToneColor='#eb2f96'
              onClick={() => this.setShowErr(false)}
            />
          </div>
        ) : null}
        <div className={styles.container}>
          <div className={styles.loginForm}>
            <div className={styles.loginFormRHS}>
              <h4>Login</h4>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validate={(values) => {
                  const errors = {};
                  const errorOf = {
                    emailError: 'emailError',
                    passwordError: 'passwordError',
                  };
                  if (!values.email) {
                    errors.email = 'Please enter your email before submit.';
                    this.setErrors(errors.email, errorOf.emailError);
                    this.setShowErr(true);
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = 'Invalid email address.';
                    this.setErrors(errors.email, errorOf.emailError);
                    this.setShowErr(true);
                  } else {
                    this.setErrors('', errorOf.emailError);
                  }

                  if (!values.password) {
                    errors.password =
                      'Please enter your password before submit.';
                    this.setErrors(errors.password, errorOf.passwordError);
                    this.setShowErr(true);
                  } else if (values.password.trim().length <= 8) {
                    errors.password =
                      'Password should be greater than 8 characters.';
                    this.setErrors(errors.password, errorOf.passwordError);
                    this.setShowErr(true);
                  } else {
                    this.setErrors('', errorOf.passwordError);
                  }

                  console.log(errors);
                  return errors;
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  touched,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => {
                  return (
                    <form
                      onSubmit={handleSubmit}
                      className={styles.loginFormMain}
                    >
                      <div className={styles.loginInput}>
                        <Input
                          name='email'
                          type='email'
                          label='Email'
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={styles.loginInput}>
                        <Input
                          name='password'
                          type='password'
                          label='Password'
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={styles.loginInput}>
                        <button type='submit' disabled={isSubmitting}>
                          Sign in
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
