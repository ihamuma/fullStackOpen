import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

import { NewPatient, NonSensitivePatient, Patient } from "../types";

const getNonsensitivePatientData = (): NonSensitivePatient[] => {
  return patientData.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getNonsensitivePatientData,
  addPatient,
};
