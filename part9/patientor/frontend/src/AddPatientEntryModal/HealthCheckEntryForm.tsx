import React from 'react';
import { Grid, Button, Segment } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { NewHealthCheckEntry } from "../types";
import { TextField, NumberField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

interface Props {
  modalOpen: boolean;
  onSubmit: (values: NewHealthCheckEntry) => void;
  onCancel: () => void;
  error?: string;
}

const HealthCheckEntryForm = ({modalOpen, onSubmit, onCancel, error }: Props) => {
    const [{ diagnoses }] = useStateValue();
    if (modalOpen === true) {
      return (
        <Formik
        initialValues={{
          type: 'HealthCheck',
          description: '',
          date: '',
          specialist: '',
          healthCheckRating: 0
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
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
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

export default HealthCheckEntryForm;