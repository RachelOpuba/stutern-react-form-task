import { useState } from "react";
import CallToAction from "./CallToAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../myStyles.css";
import { nanoid } from "nanoid";
// import ErrorModal from "./ErrorModal";
// import SuccessModal from "./SuccessModal";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  message: Yup.string().required("Required"),
});

// const onSubmit = (values) => {
//   alert(JSON.stringify(values, null, 2));
// //   onsubmitProps.resetForm();
//   const data = {
//     id: 3,
//     name: values.firstName,
//     email: values.email,
//     subject: values.subject,
//     message: values.message,
//   };
// };
const ContactForm = () => {
  const [successModal, setSuccessModal] = useState(undefined);
  const [errorModal, setErrorModal] = useState(undefined);

  return (
    <>
      <div className="form-container">
        {/* {errorModal && <ErrorModal />}
        {successModal && <SuccessModal />} */}
        <CallToAction />
        <div className="form-holder">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, onsubmitProps) => {
              const data = {
                id: nanoid(),
                name: values.firstName,
                email: values.email,
                subject: values.subject,
                message: values.message,
              };

              await axios
                .post(
                  "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
                  data
                )
                .then((response) => {
                  //   setSuccessModal(true);
                  alert("Successfully submited");
                  onsubmitProps.resetForm();
                })
                .catch((e) => {
                  //   setErrorModal(true);
                  alert("Error submiting your form. Try again later");
                })
                .finally(() => {
                  setSubmitting(false);
                });

              console.log(data);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form">
                <h2>Contact</h2>
                <p className="required">*Required</p>
                <div>
                  <label htmlFor="firstName">
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First Name*"
                    />
                  </label>
                </div>
                <ErrorMessage name="firstName" />
                <div>
                  <label htmlFor="lastName">
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name*"
                    />
                  </label>
                </div>
                <ErrorMessage name="lastName" />
                <div>
                  <label htmlFor="email">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email*"
                    />
                  </label>
                </div>
                <ErrorMessage name="email" />
                <div>
                  <label htmlFor="subject">
                    <Field
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Subject"
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="message">
                    <Field
                      id="message"
                      name="message"
                      className="form-textarea mt-5"
                      placeholder="Message*"
                      as="textarea"
                    />
                  </label>
                </div>
                <ErrorMessage name="message" />
                {isSubmitting ? (
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    Loading.....
                  </button>
                ) : (
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    Submit
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
