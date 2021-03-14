import patients from '../../data/patients'
import { NewPatientEntry, NonSensitivePatientEntry, Patient, Entry } from '../types';
import {v1 as uuid} from 'uuid'

const getPatients = (): Array<Patient> => {  
    return patients;
};

const getNonSensitivePatientEntries  = (): NonSensitivePatientEntry[] => {  
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ 
        id, 
        name, 
        dateOfBirth,
        gender, 
        occupation 
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {

  const newPatientEntry = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addPatientEntry = (patientID: string, entry: Entry): Entry => {

  const patient = getPatient(patientID)

  if (!patient) {
    throw new Error(`Failed to find patient using ID.`);
  }

  const newPatientEntry = {
    ...entry
  }

  patient.entries.push(newPatientEntry);
  return entry;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default { getPatients, getNonSensitivePatientEntries, addPatient, getPatient, addPatientEntry };