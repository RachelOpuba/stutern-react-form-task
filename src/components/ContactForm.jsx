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
  name: "",
  email: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  message: Yup.string().required("Required"),
});

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
                name: values.name,
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
                  <label htmlFor="name">
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name*"
                    />
                  </label>
                </div>
                <ErrorMessage name="name">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>

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
                <ErrorMessage name="email">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
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
                <ErrorMessage name="message">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
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
