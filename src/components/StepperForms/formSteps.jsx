import PersonalInfoForm from "./Form1";
import LifestyleForm from "./Form2";
import PhysicalAppearanceForm from "./Form3";
import MarriagePlansForm from "./Form4";
import CareerEducationForm from "./Form5";
import InterestsHobbiesForm from "./Form6";
import PhotoUploadStep from "./Form7";

// formSteps.js
export const Step1 = ({ details, setDetails, next, prev }) => (
  <PersonalInfoForm
    details={details}
    setDetails={setDetails}
    next={next}
    prev={prev}
  />
);

export const Step2 = ({ details, setDetails, next, prev }) => (
  <LifestyleForm
    details={details}
    setDetails={setDetails}
    next={next}
    prev={prev}
  />
);
export const Step3 = ({ details, setDetails, next, prev }) => (
  <PhysicalAppearanceForm
    details={details}
    setDetails={setDetails}
    next={next}
    prev={prev}
  />
);
export const Step4 = ({ details, setDetails, next, prev }) => (
  <MarriagePlansForm
    details={details}
    setDetails={setDetails}
    next={next}
    prev={prev}
  />
);
export const Step5 = ({ details, setDetails, next, prev }) => (
  <CareerEducationForm
    details={details}
    setDetails={setDetails}
    next={next}
    prev={prev}
  />
);
export const Step6 = ({ details, setDetails, next, prev }) => (
  <InterestsHobbiesForm
    details={details}
    setDetails={setDetails}
    next={next}
    prev={prev}
  />
);

export const Step7 = ({ details, setDetails, next, prev }) => (
  <PhotoUploadStep
    details={details}
    setDetails={setDetails}
    next={next}
    prev={prev}
  />
);
