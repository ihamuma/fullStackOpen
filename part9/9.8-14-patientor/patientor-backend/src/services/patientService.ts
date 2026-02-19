import patientData from '../../data/diagnoses';

import { Patient } from '../types';

const getPatients = (): Patient[] => {
    return patientData;
};

export default {
    getPatients,
};