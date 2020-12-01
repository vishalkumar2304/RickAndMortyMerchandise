import React from 'react';
import { Formik, Field, Form } from "formik"

function Home(props) {
  return (
    <div className="container-wrapper">
    <Formik
      initialValues={{
        searchText: ""
    }}
      onSubmit={(values, { }) => {
        //send get req
        console.log("Searched", values.searchText)
      }}
      enableReinitialize
    >
      {({ errors, touched, setFieldValue, values }) => {
        return (
          <Form name="search">
          <Field
            type="input"
            name="searchText"
            placeholder="Search for merchandise"
          />
          <button type="submit">Search</button>
              </Form>
        )}}</Formik>
    </div>
  );
}

export default Home;
