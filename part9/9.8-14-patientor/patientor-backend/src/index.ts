import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* TODO:
  1. Error Handling — Only patients POST is affected

  The diagnoses route is GET-only with no user input, so it's fine. But rather than adding try/catch to every future route individually,
  there's a better pattern to research: Express error-handling middleware — a middleware with four parameters (err, req, res, next). One
  central place to catch all errors across all routes. Look into what happens when you call next(error) inside a route handler.

  2. The Long if Chain in utils.ts — Redundant Work

  The big "name" in object && "dateOfBirth" in object && ... check only confirms keys exist, but then you immediately validate values
  with parseStringParam() anyway — double validation. Consider:

  - What if you just called parseStringParam(object.name) directly and let it throw if the value is missing/wrong? The in guards become
  unnecessary.
  - TypeScript trick: Array<keyof NewPatient> can give you a compiler-enforced list of required fields. If you later add a field to
  Patient, the compiler would flag it.

  3. isGender — .map(v => v.toString()) Is a No-Op

  Gender is a string enum, so Object.values(Gender) already returns strings. The .map() does nothing. Also worth exploring: as const 
  objects vs enums. A union type like 'male' | 'female' | 'other' can make type guards feel more natural and avoids the
  Array<T>.includes() type mismatch issue.

  4. Small Catch — Empty Strings
  
  !param in parseStringParam treats "" as falsy/missing. Is that intentional? An empty occupation might be legitimate. Worth deciding
  deliberately rather than accidentally.
  */
