import React from 'react';
import { Grid, Button, Segment } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { NewOccupationalHealthcareEntry } from "../types";
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

interface Props {
  modalOpen: boolean;
  onSubmit: (values: NewOccupationalHealthcareEntry) => void;
  onCancel: () => void;
  error?: string;
}

const OccupationalHealthcareEntryForm = ({modalOpen, onSubmit, onCancel, error }: Props) => {
    const [{ diagnoses }] = useStateValue();
    if (modalOpen === true) {
      return (
        <Formik
        initialValues={{
          type: 'OccupationalHealthcare',
          description: '',
          date: '',
          specialist: '',
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: ''
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
          if (!values.employerName) {
            errors.employerName = requiredError;
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
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />    
            <Field
              label="Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
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

export default OccupationalHealthcareEntryForm;