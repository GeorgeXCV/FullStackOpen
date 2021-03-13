import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { Entry, HealthCheckEntry,  HospitalEntry, OccupationalHealthcareEntry } from '../types';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <Hospital entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcare entry={entry} />;
      case 'HealthCheck':
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <Segment>
            <h1> {entry.date} <Icon name="hospital" size="big" /> </h1>
            <p>{entry.description}</p>
            <h2> Discharged: {entry.discharge.date} <Icon name="bed" size="big" /> </h2>
            <p>Reason: {entry.discharge.criteria}</p>
        </Segment>
    );
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
        <Segment>
            <h1> {entry.date} <Icon name="doctor" size="big" /> {entry.employerName} </h1>
            <p>{entry.description}</p>
            {entry.sickLeave && (
                <div>
                <h2>Sick Leave</h2>
                <p>Start Date: {entry.sickLeave.startDate}</p>
                <p>End Date: {entry.sickLeave.endDate}</p>
                </div>
            )}
        </Segment>
    );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <Segment>
            <h1> {entry.date} <Icon name="heartbeat" size="big" /></h1>
            <p>{entry.description}</p>
            {entry.healthCheckRating === 0 && (
                <Icon name="heart" color="green" size="large" />
            )}
            {(entry.healthCheckRating === 1 || entry.healthCheckRating === 2) && (
                <Icon name="heart" color="yellow" size="large" />
            )}
            {entry.healthCheckRating === 3 && (
                <Icon name="heart" color="red" size="large" />
            )}
        </Segment>
    );
};


 export default EntryDetails;