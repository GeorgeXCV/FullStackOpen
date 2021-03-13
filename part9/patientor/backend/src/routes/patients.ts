import express from 'express';
import toNewPatientEntry from '../utils'
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientEntries());
})

router.post('/', (req, res) => {
  try {
      const newPatientEntry = toNewPatientEntry(req.body)
      console.log(newPatientEntry)
      const addedEntry = patientsService.addPatient(newPatientEntry);
      res.send(addedEntry);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatient(id);
  if (patient) {
    return res.send(patient)
  } else {
    return res.status(400).send({message: 'Failed to find patient with ID.'})
  }
});

export default router;