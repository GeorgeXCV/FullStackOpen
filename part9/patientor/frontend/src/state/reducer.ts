import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Array<Diagnosis>;
    }
  | {
      type: "ADD_PATIENT_ENTRY";
      payload: Entry;
      patientId: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
        return {
          ...state,
          patient: action.payload
        };
      case "SET_DIAGNOSES":
          return {
            ...state,
            diagnoses: action.payload,
          };
      case "ADD_PATIENT_ENTRY":
          const entries = state.patient?.entries;
          if (entries) {
            entries.push(action.payload);
          }
          return state;
    default:
      return state;
  }
};

export const setPatientList =  (patientList: Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const setPatient =  (patient: Patient) : Action => {
  return {
    type: "SET_PATIENT",
    payload: patient,
  };
};

export const addPatient =  (newPatient: Patient) : Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

export const addPatientEntry = (patientId: string, newEntry: Entry): Action => {
  return {
    type: 'ADD_PATIENT_ENTRY',
    patientId: patientId,
    payload: newEntry,
  };
};

export const setDiagnoses = (diagnoses: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};