import React from 'react';
import { Grid, Button, Segment } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { NewHospitalEntry } from "../types";
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

interface Props {
  modalOpen: boolean;
  onSubmit: (values: NewHospitalEntry) => void;
  onCancel: () => void;
  error?: string;
}

const HospitalEntryForm = ({modalOpen, onSubmit, onCancel, error }: Props) => {
    const [{ diagnoses }] = useStateValue();
    if (modalOpen === true) {
      return (
        <Formik
        initialValues={{
          type: 'Hospital',
          description: '',
          date: '',
          specialist: '',
          discharge: {
            date: '',
            criteria: ''
          }
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.discharge.date)  {
            errors.discharge = requiredError;
          }
          if (!values.discharge.criteria) {
            errors.discharge = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
               {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
               <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
                <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <DiagnosisSelection            
              setFieldValue={setFieldValue}            
              setFieldTouched={setFieldTouched}            
              diagnoses={Object.values(diagnoses)}         
              />    
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      );
    } else {
      return null;
    }
  };

export default HospitalEntryForm;