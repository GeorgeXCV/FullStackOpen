import React, { useEffect } from 'react';
import { Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { useStateValue, setPatient } from "../state";

const PatientInformationPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
  
    async function getPatient() {
      try {
        const { data: selectedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);        
        dispatch(setPatient(selectedPatient));
      } catch (error) {
        console.log('Failed to fetch patient. Error: ', + error);
      }
    }

    if (!patient || patient.id !== id) {
        void getPatient();
    }
  }, [dispatch]);

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
          </div>
          : null
        }
    </div>
  );
};
  
export default PatientInformationPage;