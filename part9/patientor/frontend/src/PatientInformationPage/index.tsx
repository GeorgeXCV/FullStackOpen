import React, { useEffect } from 'react';
import { Button, Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry, Diagnosis, newEntry } from '../types';
import { useStateValue, setPatient, setDiagnoses, addPatientEntry } from "../state";
import EntryDetails from '../components/EntryDetails';
import HealthCheckEntryForm from '../AddPatientEntryModal/HealthCheckEntryForm';
import HospitalEntryForm from '../AddPatientEntryModal/HosptialEntryForm';
import OccupationalHealthcareEntryForm from '../AddPatientEntryModal/OccupationalHealthcareEntryForm';

const PatientInformationPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [activeType, setActiveType] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
    setActiveType('');
  };

  const setType = (selectedType: string): void => {
      setActiveType(selectedType);
      openModal();
  };

  const submitNewEntry = async (values: newEntry) => {
    try {
      const { data: newEntryDetails } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addPatientEntry(id, newEntryDetails));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

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
              <Button onClick={() => setType('HealthCheck')}>
                HealthCheck Entry 
                <Icon name="heartbeat"/>
              </Button>
              <Button onClick={() => setType('Hospital')}>
                Hospital Entry 
                <Icon name="hospital"/> 
              </Button>
              <Button onClick={() => setType('Occupational Healthcare')}>
                OccupationalHealthCare Entry 
                <Icon name="doctor"/>
              </Button>
              {activeType === 'HealthCheck' && (
                 <HealthCheckEntryForm
                 modalOpen={modalOpen}
                 onSubmit={submitNewEntry}
                 error={error}
                 onCancel={closeModal}
               />
              )}
              {activeType === 'Hospital' && (
                <HospitalEntryForm
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onCancel={closeModal}
                />
              )}
              {activeType === 'Occupational Healthcare' && (
              <OccupationalHealthcareEntryForm
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onCancel={closeModal}
              />
              )}
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