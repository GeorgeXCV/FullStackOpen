import React, { useEffect } from 'react';
import { Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry, Diagnosis } from '../types';
import { useStateValue, setPatient, setDiagnoses } from "../state";
import EntryDetails from '../components/EntryDetails';

const PatientInformationPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  useEffect(() => {
  
    async function getPatient() {
      try {
        const { data: selectedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);        
        dispatch(setPatient(selectedPatient));
      } catch (error) {
        console.log('Failed to get patient. Error: ', + error);
      }
    }

    async function getDiagnoses() {
      try {
        const { data: patientDiagnoses } = await axios.get<Array<Diagnosis>>(`${apiBaseUrl}/diagnoses`);        
        dispatch(setDiagnoses(patientDiagnoses));
      } catch (error) {
        console.log('Failed to get diagnoses. Error: ', + error);
      }
    }

    if (!patient || patient.id !== id) {
        void getPatient();
    }

    if (!diagnoses || diagnoses.length === 0) {
        void getDiagnoses();
    }
  }, [dispatch]);

  // const getDiagnosisCodeDescription = (code: string) : string | undefined => {
  //     const result = diagnoses.find(diagnose => diagnose.code === code);
  //     if (result) {
  //       return result.name;
  //     }
  //     return undefined;
  // };

  return (
    <div>
        {patient ? 
          <div>
            <h1>
              {patient.name}
              {patient.gender === Gender.Male && (
               <Icon name="mars" />
              )}
              {patient.gender === Gender.Female && (
               <Icon name="venus" />
              )}
              {!patient.gender && (
               <Icon name="genderless" />
              )}
            </h1>
              <div><b>SSN:</b> {patient.ssn} </div>
              <div><b>Occupation:</b> {patient.occupation} </div>
              <h2>Entries</h2>
              {patient.entries.map((entry: Entry) => {
                return (
                  <div key={entry.id}>
                    <EntryDetails entry={entry} />
                  </div>
                );
              })}
              {/* {patient.entries.length > 0 &&
              <div> 
                <h2>Entries</h2>
                {patient.entries.map((entry: Entry) => {
                return (
                <div key={entry.id}>
                  <p>{entry.date} {entry.description}</p>
                <ul>
                  {entry.diagnosisCodes &&
                    entry.diagnosisCodes.map((code) => (
                        <li key={code}>{code} {getDiagnosisCodeDescription(code)}</li>
                      )
                    )}
                </ul>
              </div>
            );
          })}
              </div>
              } */}
          </div>
          : null
        }
    </div>
  );
};
  
export default PatientInformationPage;