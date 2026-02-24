import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonsensitivePatientData());
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient({newPatient});
    res.json(addedPatient);
});

export default router;