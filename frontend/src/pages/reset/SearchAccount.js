import { Formik, Form } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function SearchAccount({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfos,
  setVisible,
}) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("It must be a valid email address")
      .max(50, "Email address can't be more than 50 characters long."),
  });
  const handleSearch = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      setUserInfos(data);
      setVisible(1);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter the email address attached to your account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSearch();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
