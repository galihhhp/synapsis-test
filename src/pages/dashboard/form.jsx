import Alert from 'components/Alert';
import { Formik, Form, Field } from 'formik';
import { useState} from 'react';
import { useRouter } from 'next/router';
import formInputSchema from 'lib/yup';
import usersService from 'services/users';

const FormInput = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const router = useRouter();
  console.log(router.query);


  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 px-md-5">
      <div className="d-flex w-50 ml-5 pl-5 mb-5 pb-5">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.back()}>
          Back
        </button>
      </div>
      <h1 className="font-weight-bold mb-4">Dashboard Form</h1>
      {router.query.isUpdate ? <div>Update</div> : <div>Add</div>}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
        }}
        validationSchema={formInputSchema}
        onSubmit={async (values) => {
          try {
            const req = router.query.isUpdate ? await usersService.updateUser(router.query._id, values) : await usersService.postUser(values);

            if (req.status === 200) {
              setSuccessMsg(req.data.message);
              setIsSuccess(true);
              setTimeout(() => {
                router.back();
              }, 500);
            }
          } catch (error) {
            console.log(error);
          }
        }}>
        {({ errors, touched }) => (
          <Form className="d-flex flex-column w-md-50 px-md-5">
            {isSuccess && <Alert status="success" message={successMsg} />}
            <Alert
              status="danger"
              isError={errors.firstName}
              isTouched={touched.firstName}
              name="First Name"
              message={errors.firstName}
            />
            <Alert
              status="danger"
              isError={errors.lastName}
              isTouched={touched.lastName}
              name="Last Name"
              message={errors.lastName}
            />
            <Alert
              status="danger"
              isError={errors.email}
              isTouched={touched.email}
              name="Email"
              message={errors.email}
            />
            <Alert
              status="danger"
              isError={errors.phone}
              isTouched={touched.phone}
              name="Phone"
              message={errors.phone}
            />
            <Alert
              status="danger"
              isError={errors.address}
              isTouched={touched.address}
              name="Address"
              message={errors.address}
            />

            <div className="d-flex mb-3 px-5">
              <div className="w-100 pr-2">
                <label htmlFor="firstName">First Name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="p-2 w-100"
                />
              </div>
              <div className="d-flex flex-column w-100">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="p-2 w-100"
                />
              </div>
            </div>
            <div className="d-flex mb-3 px-5">
              <div className="w-100 pr-2">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="p-2 w-100 mr-2"
                />
              </div>
              <div className="w-100">
                <label htmlFor="phone">Phone</label>
                <Field
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="Phone"
                  className="p-2 w-100"
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-3 px-5">
              <label htmlFor="address">Address</label>
              <Field
                id="address"
                name="address"
                placeholder="Address"
                className="p-2 w-100"
              />
            </div>
            <button type="submit" className="p-2 mx-5 btn btn-info">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormInput;
