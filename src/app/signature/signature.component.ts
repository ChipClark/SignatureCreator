// people.compenents.ts

import { Component, OnInit, ViewChild, SystemJsNgModuleLoader } from '@angular/core';

import { DomSanitizer, SafeHtml,  SafeValue } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpHandler, HttpRequest } from '@angular/common/http';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { saveAs } from 'file-saver';

import { APIService } from '../api.service'; //, APIinjection
import { MaterialModule } from '../material/material.module';  // Checkbox 


// datatables 
import { Person, Emails } from '../datatables/person';
import { Phones } from '../datatables/phones';
import { JobTitle } from '../datatables/jobs';
import { HRDepartments } from '../datatables/departmenttables';
import { TEMPORARY_NAME } from '@angular/compiler/src/render3/view/util';
import { BrowserStack } from 'protractor/built/driverProviders';
import { BreakpointObserver } from '@angular/cdk/layout';
// import { ConsoleReporter } from 'jasmine';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css'],
  

})


export class SignatureComponent implements OnInit {

  public selectedValue;
  public addNewUser;
  private citySet: boolean;
  public varTrue = true;
  public varFalse = false;

  public baseURL = 'people';

  // @ViewChild('New User') newUser;
  
  // Filters
  public activepeopleFilter = '?filter={"where":{"or":[{"employmentstatus":"A"},{"employmentstatus":"L"},{"employmentstatus":"C"}]},'
  public All = this.activepeopleFilter;
  public addFilter = this.All;


  //includes
  private officeFilter = '"emails","phones","jobtitle","officelocation","hrdepartment", "personrelationship"';
  public generalIncludes = '"include":[' + this.officeFilter + ']';
  public endRequest = '}';

  private order = '"order":"lastname ASC",'
  public personURL = this.baseURL + this.activepeopleFilter + this.order + this.generalIncludes + this.endRequest;

  public n_name;
  public city: string;
  public directPhone;
  public mobilePhone;
  public mainPhone;
  public faxPhone;

  // BUILD FORM USING PUBLIC VALUES
  public EmployeeName;
  public EmployeeNameTitle;
  public SupportedAttorneys;
  public PhoneNumbers;
  public EmailLink;
  public FirmName = 'Allen Matkins Leck Gamble Mallory & Natsis LLP ';
  public OfficeAddress;
  public Logo;

  public cities = [ "Century City", "Los Angeles", "Orange County", "San Diego", "San Francisco" ];

  private url: string;
  public people: Person[];
  private emails: Emails[];
  private selected: Person;
  private secretary = false;
  // private person: any;
  // private phone: Phones[];
  // private phonenumber: string;
  // private router: RouterLink;
  // private jobs: JobTitle[];
  // private hrdepts: HRDepartments[];

  // private logoIMG = '<img border="0" alt="Allen Matkins" src="https://www.allenmatkins.com/images/content/1/7/v2/17656/AM-LOGO-200.png?a=1568324043163" />';
  private homeURL = '<a href="http://www.allenmatkins.com/">';
  private doubleSpace = " &nbsp;";
  private tempPipe = '<span style="font-family: Lato, Arial, Helvetica, sans-serif; font-weight: 400; color: #002554;">|</span>'
  private tempStyle = ' style="font-family: Lato, Arial, Helvetica, sans-serif; font-size: 12pt; font-weight:400; color:#464646; line-height: 16pt;"';
  private linkStyle = ' style="font-family: Lato, Arial, Helvetica, sans-serif; font-size: 12pt; font-weight:400; color:#077c9A; line-height: 16pt;"';

  // File information 
  public FileName;
  public declarationHTML = '<!DOCTYPE html><html><head>';
  public titleHTML = '<title>';
  public endtitleHTML = '</title>';
  public enddeclarationHTML = '</head>';
  public bodyHTML = '<body ' + this.tempStyle + ' >';
  public bodyDocument;
  public openDIV = '<div ' + this.tempStyle + ' >';
  public closeDIV = '</div>';
  public endbodyHTML = '</body></html>';
    
  
  constructor(
    private apiService: APIService,
    private http: HttpClient,
    protected sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private _router: Router,
    private location: Location,
    private materials: MaterialModule
    
  ) { this.materials.addCheckbox(); }

  ngOnInit() {
    if ( !this.people ) {
      this.getPeople();
    }
  }

  addLine(lineElement: string): SafeHtml{
    let lineHTML;
    switch (lineElement) {
      case "EmployeeName":
        lineHTML = this.EmployeeName;
        break;
      case "PhoneNumbers":
        lineHTML = this.PhoneNumbers;
        break;
      case "EmailLink":
        lineHTML = this.EmailLink;
        break;
      case "FirmName":
        lineHTML = this.FirmName;
        break;
      case "OfficeAddress":
        lineHTML = this.OfficeAddress;
        break;
      case "Logo": 
        lineHTML = this.Logo;
        break;
    }

    return this.sanitizer.bypassSecurityTrustHtml(lineHTML);
  }

  addEmail(fullname: string): string {
    const tempEmails = this.people.find( p => {
      return p.fullname === fullname;
    }).emails;
    
    let xEmail = tempEmails.find( e => {
      return e.emailtypeid === 1;
    }).emailaddress;
    return xEmail;
  }

  addEmailLink(fullname: string, location: string): SafeHtml {
    let tempHTML = "";
    const tempEmails = this.people.find( p => {
      return p.fullname === fullname;
    }).emails;
    
    this.selected.email = tempEmails.find( e => {
      return e.emailtypeid === 1;
    }).emailaddress;
    if ( this.selected.email ) {
      tempHTML = '<a href="mailto:' + this.selected.email + '"' + this.linkStyle + ' >' + this.selected.email + '</a>'
    }

    let personBio = this.people.find( p => {
      return p.fullname === fullname;
    }).biographyurl;
  
    if ( personBio ) {
      this.EmailLink = tempHTML + this.doubleSpace + this.tempPipe + '<a href="' + personBio + '" target=' + '"_blank"' 
      + 'class=' + '"inline"' + this.linkStyle + ' > Bio </a>';
    }
    else {
      this.EmailLink = tempHTML;
    }
    return this.sanitizer.bypassSecurityTrustHtml(tempHTML);
  }

  add_n_EmailLink(n_email: string): SafeHtml {
    let inline = "";
    if (this.materials.newUserForm.value.n_BioURL) {
      inline = "class='inline' ";
    }
    const emailLink = '<a href="mailto:' + n_email + '" ' + inline + this.linkStyle + ' >' + n_email + '</a>'
    return this.sanitizer.bypassSecurityTrustHtml(emailLink);
  }

  add_n_BioLink(n_bio: string): SafeHtml {
    let bioLink;
    if (n_bio && this.materials.newUserForm.value.cboxBioURL) {
      bioLink = this.addPipe() + '<a href="' + n_bio + '"' + ' target="_blank" class=' + '"inline"' + ' >' + "Bio</a>";
    }
    // else if (this.materials.newUserForm.value.n_BioURL) {

    // }
    return this.sanitizer.bypassSecurityTrustHtml(bioLink)
  }

  addEmployee(fullname: string): SafeHtml {
    if (this.materials.checkboxForm.value.EmployeeName_value) {
      this.EmployeeName = this.materials.checkboxForm.value.EmployeeName_value;
    }
    else {
      this.EmployeeName = fullname;
    }
    let tempPerson = this.people.find( p => {
      return p.fullname === fullname;
    });

    this.FileName = tempPerson.addomainaccount;
    fullname = "<strong>" + this.EmployeeName + "</strong>";
    if (this.materials.checkboxForm.value.EmployeeTitle) {
      fullname = fullname + this.doubleSpace + this.tempPipe + this.doubleSpace + this.addTitle();
    }
    
    if (this.isReply()) {
        fullname =  fullname + this.doubleSpace + this.tempPipe + this.doubleSpace + "Allen Matkins";
    }
    if (this.isSecretary() && !this.isReply() && this.materials.checkboxForm.value.SupportedAttorneys) {
      fullname = fullname + " for";
    }
    this.EmployeeNameTitle = fullname;

    return this.sanitizer.bypassSecurityTrustHtml(fullname);
  }

  add_n_Employee(fullname: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(fullname);
  }

  addLogo(location: string): SafeHtml {
    let logo='';
    const layoutStyle = "style='" + 'font-family:"Times New Roman", serif; font-size: 26pt; color: #002554; line-height: 28pt; padding-top:8px; display: block; text-decoration: none;' + "' >";
    const formStyle ="style='" + 'font-family:"Times New Roman", serif; font-size: 26pt; color: #002554; line-height: 28pt; display: block; text-decoration: none;' + "' />";

    if ( location == "layout" && this.materials.checkboxForm.value.Logo == true)  {
      logo = "<a href=" + '"http://www.allenmatkins.com"' + "class=" + '"logo"' + layoutStyle + "Allen Matkins" + "</a>";
    }
    else if ( location == "form" ) {
      logo = "<a href=" + '"http://www.allenmatkins.com"' + "class=" + '"logo"' + formStyle + "Allen Matkins" + "</a>";
    }
    this.Logo = logo;
    
    return this.sanitizer.bypassSecurityTrustHtml(logo);
  }

  addOfficeAddress(fullname: string): string {
    this.OfficeAddress = this.people.find( p => {
      return p.fullname === fullname;
    }).officeaddress;
    return this.OfficeAddress;
  }

  addPhoneNumbers(): SafeHtml {
    let tempPhone; 
    let pipeFill = this.doubleSpace + this.tempPipe + this.doubleSpace;
    if (this.materials.newUserForm.value.cboxDirectPhone) {
      if (this.materials.newUserForm.value.n_DirectPhone) {
        tempPhone = "Direct " + this.materials.newUserForm.value.n_DirectPhone;
        if (this.materials.newUserForm.value.cboxMainPhone && this.materials.newUserForm.value.n_MainPhone) {
          tempPhone = tempPhone + pipeFill + "Main " + this.materials.newUserForm.value.n_MainPhone;
          if (this.materials.newUserForm.value.cboxMobilePhone && this.materials.newUserForm.value.n_MobilePhone) {
            tempPhone = tempPhone + pipeFill + "Mobile " + this.materials.newUserForm.value.n_MobilePhone;
          }
        }
        else if (this.materials.newUserForm.value.cboxMobilePhone && this.materials.newUserForm.value.n_MobilePhone) {
          tempPhone = tempPhone + pipeFill + "Mobile " + this.materials.newUserForm.value.n_MobilePhone;
        }
      }
      else if (this.materials.newUserForm.value.cboxMainPhone && this.materials.newUserForm.value.n_MainPhone) {
        tempPhone = "Main " + this.materials.newUserForm.value.n_MainPhone;
        if (this.materials.newUserForm.value.cboxMobilePhone && this.materials.newUserForm.value.n_MobilePhone) {
          tempPhone = tempPhone + pipeFill + "Mobile " + this.materials.newUserForm.value.n_MobilePhone;
        }
      } 
      else if (this.materials.newUserForm.value.cboxMobilePhone && this.materials.newUserForm.value.n_MobilePhone) {
        tempPhone = "Mobile " + this.materials.newUserForm.value.n_MobilePhone;
      }
    }

    return this.sanitizer.bypassSecurityTrustHtml(tempPhone);
  }

  addPipe(): SafeHtml {
    let xPipe = this.doubleSpace + this.tempPipe + this.doubleSpace;
    return this.sanitizer.bypassSecurityTrustHtml(xPipe);
  }

  addSuffix(fullname: string): string {
    let tempPerson = this.people.find( p => {
      return p.fullname === fullname;
    });
    if ( tempPerson.suffix ) { return " " + tempPerson.suffix }
    return "";
  }

  addSupportedAttorneys(fullname: string): string {
    let tempAttorneyNames = "";
    let tempPerson = this.people.find( p => {
      return p.fullname === this.selectedValue;
    });
    if (tempPerson.supportedpeople 
        && this.materials.checkboxForm.value.SupportedAttorneys
        && tempPerson.jobtitleid == 30 ) {
          tempPerson.layout_title = "Legal Secretary xxx";
          tempAttorneyNames = tempPerson.supportedpeople;
    }
    this.SupportedAttorneys = tempAttorneyNames;
    return tempAttorneyNames;
  }

  addTest(parameter: string): string {
    // console.log(parameter);
    return parameter;
  }

  addTitle(): string {
    let tempTitle;
    if (this.materials.checkboxForm.value.EmployeeTitle_value) {
      tempTitle = this.materials.checkboxForm.value.EmployeeTitle_value;
    }
    else {
      tempTitle = this.people.find( p => {
        return p.fullname === this.selectedValue
      }).title;
    }
    return tempTitle;
  }

  buildAllPeopleData(): void {
    for ( let i = 0; i < this.people.length; i++ ) {
      if ( this.people[i] ) {
        this.people[i].fullname = this.buildFullName(this.people[i]);
        this.people[i].title = this.buildTitle(this.people[i]);
        this.buildOfficeAddress(this.people[i]);
        // if (this.people[i].pkpersonid == 17 || this.people[i].pkpersonid == 7 || !this.people[i].title ) {
        //   console.log(this.people[i]);
        // }
        
        if (this.people[i].personrelationship) {
          const relatedArray = this.people[i].personrelationship;
          for (let j = 0; j < relatedArray.length; j++) {
            for (let k = 0; k < this.people.length; k++) {
              if (relatedArray[j].relatedpersonid === this.people[k].pkpersonid) {
                this.people[k].supportrelationships = true;
                const relatedPerson = {
                  personrelationshipid: null,
                  pkpersonid: null,
                  relationshiptypeid: null,
                  relatedpersonid: null,
                  supportedpersonid: relatedArray[j].pkpersonid,
                  supportedpersonfullname: this.people[i].fullname
                  
                };
                this.people[k].personrelationship.push(relatedPerson);

                if (!this.people[k].supportedpeople) {
                  this.people[k].supportedpeople = relatedPerson.supportedpersonfullname;
                }
                else {
                  this.people[k].supportedpeople = this.people[k].supportedpeople + ", " + relatedPerson.supportedpersonfullname;
                }
              }
              
            }
          }
        }        
      }
    }
    // console.log(this.people[3]);

    this.people = this.people;
  }

  buildFile(): void {
    let tempFILE = this.declarationHTML + this.titleHTML + this.EmployeeName + this.endtitleHTML + this.enddeclarationHTML;

    if (this.isReply()) {
        this.bodyDocument = this.openDIV + this.EmployeeNameTitle + this.closeDIV + this.PhoneNumbers;
      }
    else if (this.isSecretary()) {
        this.bodyDocument = this.openDIV + this.EmployeeNameTitle + this.closeDIV;
        this.bodyDocument = this.bodyDocument + this.openDIV + this.SupportedAttorneys + this.closeDIV;
        this.bodyDocument = this.bodyDocument + this.openDIV + this.PhoneNumbers + this.closeDIV;
        this.bodyDocument = this.bodyDocument + this.openDIV + this.FirmName + this.closeDIV; 
        this.bodyDocument = this.bodyDocument + this.openDIV + this.OfficeAddress + this.closeDIV; 
        this.bodyDocument = this.bodyDocument + this.openDIV + this.Logo +  this.closeDIV;
    } 
    else {
      this.bodyDocument = this.openDIV + this.EmployeeNameTitle + this.closeDIV;
      if (this.materials.checkboxForm.value.DirectPhone || this.materials.checkboxForm.value.MainPhone || this.materials.checkboxForm.value.MobilePhone) {
        this.bodyDocument = this.bodyDocument + this.openDIV + this.PhoneNumbers + this.closeDIV;
      }
      if (this.materials.checkboxForm.value.FirmName) {
        this.bodyDocument = this.bodyDocument + this.openDIV + this.FirmName + this.closeDIV; 
      }
      if (this.materials.checkboxForm.value.OfficeAddress ) {
        this.bodyDocument = this.bodyDocument + this.openDIV + this.OfficeAddress + this.closeDIV;
      }
      if (this.materials.checkboxForm.value.Logo ) {
        this.bodyDocument = this.bodyDocument + this.openDIV + this.Logo +  this.closeDIV;
      }

  }
    tempFILE = tempFILE + this.bodyHTML + this.bodyDocument + this.endbodyHTML;

    if (!this.isReply()) {
      this.FileName = this.FileName + "_standard.htm"
    }
    else {
      this.FileName = this.FileName + "_reply.htm"
    };

    this.writeFile(tempFILE, this.FileName);
  }

  buildFullName(person: any): string {
    let fname, mi, lname;
    if ( person.preferredfirstname ) {
      fname = person.preferredfirstname + " "
    }
    else {
      fname = person.firstname + " "
    }
    if ( person.middlename ) {
      if ( person.middlename.length > 1 ) {
        mi = person.middlename + ' '
      }
      else {
        mi = person.middlename + '. '
      }
    }
    else {
        mi = "";
    }
    lname = person.lastname;
    person.fullname = fname + mi + lname;
    // if (this.apiService.debug == true) console.log(this.people[i].fullname);
    return person.fullname;
  }

  buildOfficeAddress(person: any): void {
    switch (person.officelocationid) {
      case 1:
        person.faxphonenumber = "(213) 620-8816";
        person.mainphonenumber = "(213) 622-5555";
        person.extension = " x1";
        person.officeaddress = "865 South Figueroa Street, Suite 2800, Los Angeles, CA 90017-2543";
        person.officecity = "Los Angeles";
        break;
      case 2:
        person.faxphonenumber = "(949) 553-8354";
        person.mainphonenumber = "(949) 553-1313";
        person.extension = " x2";
        person.officeaddress = "1900 Main Street, 5th Floor, Irvine, CA 92614-7321";
        person.officecity = "Orange County";
        break;
      case 3:
        person.faxphonenumber = "(619) 233-1155";
        person.mainphonenumber = "(619) 233-1158";
        person.extension = " x3";
        person.officeaddress = "One America Plaza, 600 West Broadway, 27th Floor, San Diego, CA 92101-0903";
        person.officecity = "San Diego";
        break;
      case 4:
        person.faxphonenumber = "(310) 788-2410";
        person.mainphonenumber = "(310) 788-2400";
        person.extension = " x4";
        person.officeaddress = "1901 Avenue of the Stars, Suite 1800, Los Angeles, CA 90067-6019";
        person.officecity = "Century City";
        break;
      case 5:
        person.faxphonenumber = "(415) 837-1516";
        person.mainphonenumber = "(415) 837-1515";
        person.extension = " x5";
        person.officeaddress = "Three Embarcadero Center, 12th Floor, San Francisco, CA 94111-4074";
        person.officecity = "San Francisco";
        break;

    }
  }

  buildPhoneLine(fullname: string): SafeHtml {
    let phoneLine = "";
    let emailHTML;
    let pspan = this.doubleSpace + this.tempPipe + this.doubleSpace;
    this.selected = this.people.find( p => {
      return p.fullname === fullname;
    });
    this.getPhone(fullname, "direct");
    this.getPhone(fullname, "mobile");
    this.getPhone(fullname, "main");
    this.getPhone(fullname, "fax");
    if (this.isSecretary()) {
      if (this.materials.checkboxForm.value.DirectPhone == true) {
        phoneLine = "Direct " + this.directPhone + this.selected.extension + this.directPhone.slice(10, this.directPhone.length);
      }
      if (this.materials.checkboxForm.value.Email == true && this.selected.email ) {
        emailHTML = '<a href="mailto:' + this.selected.email + '"' + this.linkStyle + ' >' + this.selected.email + '</a>'
        if (this.materials.checkboxForm.value.DirectPhone == true) { 
            phoneLine = phoneLine + pspan + emailHTML;
          }
        else {
          phoneLine = emailHTML;
        }
      }
    }
    else {
      if ( this.isReply() ) {
        if (this.materials.checkboxForm.value.Email == true) {
          phoneLine = '<a href="mailto:' + this.selected.email + '"' + this.tempStyle + ' >' + this.selected.email + '</a>';
          if (this.materials.checkboxForm.value.DirectPhone) {
            phoneLine = phoneLine + pspan + "Direct " + this.directPhone;
          }
          if ( this.materials.checkboxForm.value.MainPhone ) {
            phoneLine = phoneLine + pspan + "Main  " + this.mainPhone;
          }
          if ( this.materials.checkboxForm.value.MobilePhone ) {
            phoneLine = phoneLine + pspan + "Mobile " + this.mobilePhone;
          }
        }
        else {
          if (this.materials.checkboxForm.value.DirectPhone) {
            phoneLine = "Direct " + this.directPhone;
            if ( this.materials.checkboxForm.value.MainPhone ) {
              phoneLine = phoneLine + pspan + "Main  " + this.mainPhone;
            }
            if ( this.materials.checkboxForm.value.MobilePhone ) {
              phoneLine = phoneLine + pspan + "Mobile " + this.mobilePhone;
            }
          }
          else if ( this.materials.checkboxForm.value.MainPhone ) {
            phoneLine = "Main  " + this.mainPhone;
            if ( this.materials.checkboxForm.value.MobilePhone ) {
              phoneLine = phoneLine + pspan + "Mobile " + this.mobilePhone;
            }
          }
          else if ( this.materials.checkboxForm.value.MobilePhone ) {
            phoneLine = "Mobile " + this.mobilePhone;
          }
        }
      }
      else {
        if (this.materials.checkboxForm.value.DirectPhone) {
          phoneLine = "Direct " + this.directPhone;
          if (this.materials.checkboxForm.value.MainPhone) {
            phoneLine = phoneLine + pspan + "Main  " + this.mainPhone;
          }
          if (this.materials.checkboxForm.value.MobilePhone) {
            phoneLine = phoneLine + pspan + "Mobile " + this.mobilePhone;;
          }
        }
        else if (this.materials.checkboxForm.value.MainPhone) {
          phoneLine = "Main  " + this.mainPhone;
          if (this.materials.checkboxForm.value.MobilePhone) {
            phoneLine = phoneLine + pspan + "Mobile " + this.mobilePhone;;
          }
        }
        else if (this.materials.checkboxForm.value.MobilePhone) {
          phoneLine = "Mobile " + this.mobilePhone;;
        }
      }
    }

    this.PhoneNumbers = phoneLine;
    return this.sanitizer.bypassSecurityTrustHtml(phoneLine); 
  }

  buildTitle(person: any): string {
    let title = " ";
    if (person.jobtitle) {
      if ( person.jobtitle.jobtitle ) {
        title = person.jobtitle.jobtitle;    
      }
    }
    if (title == "Legal Secretary") {
      this.secretary = true;
    }
    else {
      this.secretary = false;
    }
    return title;
  }

  buildURL() {
    this.personURL = this.baseURL + this.activepeopleFilter + this.order + this.generalIncludes + this.endRequest;  // URL to web api
    // if (this.apiService.debug == true)  console.log(this.personURL);
  }

  checkStatus(checkboxType: string): boolean {
    let response = true;
    switch (checkboxType) {
      case 'EmployeeName': 
        if (!this.materials.checkboxForm.value.EmployeeName) {
          response = false;
        }
        break;
      case 'EmployeeTitle': 
        if (!this.materials.checkboxForm.value.EmployeeTitle) {
          response = false;
        }
        break;
      case 'FirmName': 
        if (this.materials.checkboxForm.value.FirmName) {
          this.FirmName = 'Allen Matkins Leck Gamble Mallory & Natsis LLP ';
          response = false;
        }
        else {
          this.FirmName = "";
        };
        break;
      case 'OfficeAddress': 
      if (this.isReply()) {
        this.materials.checkboxForm.value.OfficeAddress == false;
        response = false;
      };
        break;
      case 'MainPhone': 
        if (this.isReply()) {
          this.materials.checkboxForm.value.MainPhone == false;
          response = false;
        };
        break;
      case 'DirectPhone': 
        if (this.isReply()) {
          // this.materials.checkboxForm.value.DirectPhone == false;
          response = false;
        };
        break;
      case 'MobilePhone': 
        if (this.isReply()) {
          this.materials.checkboxForm.value.MobilePhone == false;
          response = false;
        };
        break;
      case 'SupportedAttorneys': 
        if (!this.materials.checkboxForm.value.SupportedAttorneys) {
          response = false;
        }
        break;
      case 'Fax': 
        if (!this.materials.checkboxForm.value.Fax) {
          response = false;
        }
        break;
      case 'Email': 
        response = true;
        break;
      case 'Logo': 
        if (this.materials.checkboxForm.value.Logo == false ) {
          response = false;
        };
        break;
      case 'Reply': 
        if (this.isReply() ) {
          response = true;
        };
      case 'Standard': 
        if (this.isReply()) {
        response = false;
        };
    } 
    
    return response;
  }

  clearSelected() {
      this.selectedValue = null;
      this.materials.checkboxForm.value.EmployeeName = null;
      this.materials.checkboxForm.value.EmployeeTitle = null;
      this.materials.checkboxForm.value.officeaddress = null;
      this.materials.checkboxForm.value.mainphone = null;
      this.materials.checkboxForm.value.directphone = null;
      this.materials.checkboxForm.value.mobilephone = null;
      this.materials.checkboxForm.value.fax = null;
      this.materials.checkboxForm.value.email = null;
  }

  clearNewUser() {
    this.materials.newUserForm.value.n_EmployeeName = null;
    this.materials.newUserForm.value.n_EmployeeTitle = null;
    this.materials.newUserForm.value.n_FirmName = "Allen Matkins Leck Gamble Mallory & Natsis LLP"
    this.materials.newUserForm.value.n_officeaddress = null;
    this.materials.newUserForm.value.n_mainphone = null;
    this.materials.newUserForm.value.n_directphone = null;
    this.materials.newUserForm.value.n_mobilephone = null;
    this.materials.newUserForm.value.n_fax = null;
    this.materials.newUserForm.value.n_email = null;
  }

  createNewUser() {
    this.addNewUser = true;
    this.clearNewUser();
    this.clearSelected();
  }

  displayUserDetails(): void {
    this.addNewUser = false;
    this.selected = this.people.find( p => {
      return p.fullname === this.selectedValue;
    });
  }

  getOffice(city: string): void {

    // console.log("in getOffice()" + city);
    switch (city) {
      case 'Century City': 
        this.materials.newUserForm.value.n_fax = "(310) 788-2410 (fax)" ;
        this.materials.newUserForm.value.n_MainPhone = "(310) 788-2400";
        this.materials.newUserForm.value.n_OfficeAddress = "1901 Avenue of the Stars, Suite 1800, Los Angeles, CA 90067-6019";
        break;
      case 'Los Angeles':
        this.materials.newUserForm.value.n_Fax = "(213) 620-8816";
        this.materials.newUserForm.value.n_MainPhone = "(213) 622-5555";
        this.materials.newUserForm.value.n_OfficeAddress = "865 South Figueroa Street, Suite 2800, Los Angeles, CA 90017-2543";
        break;
      case 'Orange County': 
        this.materials.newUserForm.value.n_Fax = "(949) 553-8354 (fax)";
        this.materials.newUserForm.value.n_MainPhone = "(949) 553-1313";
        this.materials.newUserForm.value.n_OfficeAddress = "1900 Main Street, 5th Floor, Irvine, CA 92614-7321";
        break;
      case 'San Diego':
        this.materials.newUserForm.value.n_Fax = "(619) 233-1155 (fax)";
        this.materials.newUserForm.value.n_MainPhone = "(619) 233-1158";
        this.materials.newUserForm.value.n_OfficeAddress = "One America Plaza, 600 West Broadway, 27th Floor, San Diego, CA 92101-0903";
        break;
      case 'San Francisco':
        this.materials.newUserForm.value.n_Fax = "(415) 837-1516 (fax)";
        this.materials.newUserForm.value.n_MainPhone = "(415) 837-1515";
        this.materials.newUserForm.value.n_OfficeAddress = "Three Embarcadero Center, 12th Floor, San Francisco, CA 94111-4074";
        break;
    }
  }

  getTitles(currentperson: any): void {
    this.selected.jobtitle = currentperson.jobtitle.jobtitle;
  }
  
  getPeople(): any {
    // this.clearSelected();
    this.buildURL();
    // if (this.apiService.debug == true)  console.log(this.personURL);
    this.apiService.getDATA(this.personURL)
      .subscribe(people => {
        this.people = people;
        this.buildAllPeopleData();
        if (this.apiService.debug == true)  {
          for (let i=0;  i < this.people.length; i++) {
            if (this.apiService.debug == true && this.people[i].pkpersonid == 17 ) {
              // console.log(this.people[i]);
            }
          }
        }
      });
  }

  getPrefName(currentperson: any): string {
    let pName;
    if (currentperson.firstname == currentperson.preferredfirstname || !currentperson.preferredfirstname) {
      return null;
    }
    else pName = '"' + currentperson.preferredfirstname + '"';
    return pName;
  }

  getMiddleName(currentperson: any): string {
    let mname;
    if (!currentperson.middlename) {
      return null;
    }
    else {
      if (currentperson.middlename.length == 1){
        mname = currentperson.middlename + ". ";
      }
      else {
        mname = currentperson.middlename + " ";
      }
    }
    return mname;
  }

  convertPhone(phonetype: string): string {
    let pnum; 

    return pnum
  }

  getPhone(fullname: string, phonetype: string): SafeHtml | SafeValue {
    this.selected = this.people.find( p => {
      return p.fullname === fullname;
    });
    let phonetypeid; 
    switch (phonetype) {
      case "mobile":  
        phonetypeid = 2;
        break;
      case 'direct':
        phonetypeid = 1;
        break;
      case 'main':
        this.mainPhone = this.selected.mainphonenumber;
        return this.mainPhone;
      case 'fax':
        this.faxPhone = this.selected.faxphonenumber;
        return this.faxPhone;
    }
    
    var officePhone = this.selected.phones.find(obj => {
      return obj.phonetypeid === phonetypeid;
    });

    if ( officePhone ) {
      var pnum = officePhone.phonenumber;
    // if (this.apiService.debug == true)  console.log(pnum);
      pnum = pnum.replace(/\D+/g, '')
        .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    else { 
      if ( phonetypeid == 2 ) { 
        // this.checkboxForm;
        return null;
      }
      if ( phonetypeid == 1 ) { 
        // this.checkboxForm;
        return null;
      }
     };
    
    switch (phonetype) {
      case "mobile":  
        this.selected.mobilephonenumber = pnum;
        this.mobilePhone = pnum;
        break;
      case 'direct':
        this.selected.directphonenumber = pnum;
        this.directPhone = pnum;
        break;
    }
    return this.sanitizer.bypassSecurityTrustHtml(pnum);
  }

  hasTitle(): boolean {
    if (this.materials.checkboxForm.value.EmployeeTitle) {
      return true;
    }
    return false;
  }

  isReply(): boolean {
    if (this.materials.SignatureType.value.sigtype == 'reply') {
      // console.log("MainPhone status: ");
      // console.log(this.materials.checkboxForm.value.MainPhone);
      return true;
    }
    return false;;
  }

  isSecretary(): boolean {
    let tempPerson = this.people.find( p => {
      return p.fullname === this.selectedValue;
    });
    // console.log(tempPerson);
    if (tempPerson.title == "Legal Secretary") {
      // console.log("jobtitle: " + tempPerson.title );
      return true;
    }
    return false;
  }

  pushPhoneNumbers(phonetype: string): SafeHtml {
    let pnum;
    let pspan = this.doubleSpace + this.tempPipe + this.doubleSpace;
    switch (phonetype) {
      case 'direct':
        pnum = "Direct " + this.directPhone;
        break;
      case 'main':
        if ( this.isReply()) {
          if ( this.materials.checkboxForm.value.DirectPhone || this.materials.checkboxForm.value.Email ) {
            pnum = pspan + "Main  " + this.mainPhone;
          }
          
        }
        else if ( this.materials.checkboxForm.value.DirectPhone ) {
          pnum = pspan + "Main  " + this.mainPhone;
        }
        else {
          pnum = "Main  " + this.mainPhone;
        }
          
        break;
      case "mobile": 
        if ( this.isReply()) {
          if ( this.materials.checkboxForm.value.DirectPhone || this.materials.checkboxForm.value.MainPhone || this.materials.checkboxForm.value.Email ) {
            pnum = pspan + "Mobile " + this.mobilePhone;
          } 
        }
        else if (this.materials.checkboxForm.value.DirectPhone || this.materials.checkboxForm.value.MainPhone) {
          pnum = pspan + "Mobile " + this.mobilePhone;
        }
        else {
          pnum = "Mobile " + this.mobilePhone;
        }
        
        break;
      case 'fax':
        if ( this.materials.checkboxForm.value.DirectPhone || this.materials.checkboxForm.value.MainPhone || this.materials.checkboxForm.value.MobilePhone || this.materials.checkboxForm.value.Email ) {
          pnum = pspan + "Fax " + this.faxPhone;
        }
        else {
          pnum = "Fax " + this.faxPhone;
        }
        break;
    }

    return this.sanitizer.bypassSecurityTrustHtml(pnum)
  }

  pushSupportedAttorneys(currentperson: any): string {
    let tempAttorneyNames = ""; 


    return tempAttorneyNames;
  }

  
  
  sanitizeScript(sanitizer: DomSanitizer) { }

  setValue(checkBox: string, value: boolean) {
    let status;
    switch (checkBox) {
      case 'MainPhone':
        if (value == true) {
          this.materials.checkboxForm.value.MainPhone = true; 
        }
        else {
          this.materials.checkboxForm.value.MainPhone = false;
        } 
        status = this.materials.checkboxForm.value.MainPhone;
        break;
    }
  
    console.log(checkBox + " status: ");
    console.log(status);

  }

  writeFile(htmlFile: string, fileName: string) {
    let FileSaver = require('file-saver');
    let tempFile = new File([htmlFile], fileName, {type: "text/plain:charset=utf-8"});
    FileSaver.saveAs(tempFile);
  }

  

}
