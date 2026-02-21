import patientData from '../../data/patients';

import { NonSensitivePatient } from '../types';


const getNonsensitivePatientData = (): NonSensitivePatient[] => {
    return patientData.map(({ ssn: _ssn, ...rest }) =>  rest ) ;
};

export default {
    getNonsensitivePatientData
};