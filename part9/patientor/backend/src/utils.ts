/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntry, NewPatientEntry, Gender, Entry} from './types';
import { v1 as uuid } from 'uuid';

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: object.entries
  }
}

export const toNewEntry = (object: any): Entry => {
   
   if (!object || !object.type) {
      throw new Error('Missing or invalid entry.');
   }

   if (!object.dianosisCodes) {
     object.diagnosisCodes = []
   }

   const baseEntry: BaseEntry = {
    id: uuid(),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
  };

  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating)
      }
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseCriteria(object.discharge.criteria)
        }
      }
    case 'OccupationalHealthcare':
        let sickLeave;
        if (object.sickLeave.startDate && object.sickLeave.endDate) {
          sickLeave = {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate)
          };
        }
        return {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName: parseEmployer(object.employerName),
          sickLeave
      }
    default:
      throw new Error('Entry type not supported.');
  }
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isNumber = (param: unknown): param is number => {
    return typeof param === 'number' || param instanceof Number;
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };
  
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  }

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description');
    }
    return description;
  }

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
    return ssn;
  }

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {      
      throw new Error('Incorrect or missing Gender: ' + gender);
    }
    return gender;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
  }

  const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist');
    }
    return specialist;
  }

  const parseEmployer = (employer: unknown): string => {
    if (!employer || !isString(employer)) {
      throw new Error('Incorrect or missing employer');
    }
    return employer;
  }

  const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
      throw new Error('Incorrect or missing criteria');
    }
    return criteria;
  }

  const parseRating = (rating: unknown): number => {
    if (!rating || !isNumber(rating)) {
      throw new Error('Incorrect or missing rating');
    }
    return rating;
  }

  const parseDiagnoses = (diagnoses: any): [] => {
    if (!diagnoses) {
        return []
    }

    if (!Array.isArray(diagnoses)) {
      throw new Error('Diagnoses expected to be array');
    }
  
    return diagnoses as [];
  }