export class PersonRelationship {
    personrelationshipid: number;
    pkpersonid: number;
    relationshiptypeid: number;
    relatedpersonid: number;
    supportedpersonid: number;
    supportedpersonfullname: string;
}

export class Secretaries {
    pkpersonid: number;
    supportedpersonid: number;
    supportedpersonfullname: string;
}