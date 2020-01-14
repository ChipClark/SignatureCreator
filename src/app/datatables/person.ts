import { Phones } from "./phones";
import { OfficeLocation } from "./officelocation";
import { HRDepartments, LegalDepartments, LegalSubDepartments } from "./departmenttables";
import { License, LicenseType } from "./practicestables";
import { Education } from "./school";
import { JobTitle } from "./jobs";
import { Photos } from "./photo";
import { PersonRelationship } from "./personrelationship";

export class Person {
  isSet: boolean;
  fullname: string;
  title: string;
  layout_title: string;
  fullname_title: string;
  addomainaccount: string;
  pkpersonid: number;
  personguid: string;
  lastname: string;
  firstname: string;
  middlename: string;
  preferredfirstname: string;
  displayname: string;
  initials: string;
  prefix: string;
  suffix: string;
  biographyurl: string;

  officelocationid: number;
  officelocation: OfficeLocation;
  officeaddress: string;
  officecity: string;
  officecityfullname: string;
  
  jobtitleid: number;
  jobtitle: JobTitle[];
  emails: Emails[];

  mainphonenumber: string;
  directphonenumber: string;
  mobilephonenumber: string;
  faxphonenumber: string;
  extension: string;
  email: string;
  phones: Phones[];
  hrdepartment: HRDepartments[];

  supportrelationships: boolean;
  personrelationship: PersonRelationship[];
  supportedpeople: string;
  
}

export class Emails {
  active: boolean;
  description: string;
  emailaddress: string;
  emailid: number;
  emailtypeid: number;
  entityid: number;
  entitytypeid: number;
}