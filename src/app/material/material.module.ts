import { NgModule } from '@angular/core';
import { forwardRef, HostBinding, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatRadioModule, MatSelectModule } from '@angular/material';


@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule
    ]
})

export class MaterialModule implements ControlValueAccessor {

    checkboxForm: FormGroup;
      EmployeeName: FormControl;
      EmployeeTitle: FormControl;
      FirmName: FormControl;
      OfficeAddress: FormControl;
      MainPhone: FormControl;
      DirectPhone: FormControl;
      MobilePhone: FormControl;
      SupportedAttorneys: FormControl;
      Fax: FormControl;
      Email: FormControl;
      Logo: FormControl;
      EmployeeName_value: FormControl;
      EmployeeTitle_value: FormControl;
      FirmName_value: FormControl;
      OfficeAddress_value: FormControl;
      MainPhone_value: FormControl;
      DirectPhone_value: FormControl;
      MobilePhone_value: FormControl;
      SupportedAttorneys_value: FormControl;
      Fax_value: FormControl;
      Email_value: FormControl;
      Logo_value: FormControl;
      // SignatureType: FormControl;

    SignatureType: FormGroup;
      sigtype: FormControl;
    
      
    newUserForm: FormGroup;
      n_EmployeeName: FormControl;
      n_BioURL: FormControl;
      n_EmployeeTitle: FormControl;
      n_FirmName: FormControl;
      n_OfficeAddress: FormControl;
      n_MainPhone: FormControl;
      n_DirectPhone: FormControl;
      n_MobilePhone: FormControl;
      n_SupportedAttorneys: FormControl;
      n_Fax: FormControl;
      n_Email: FormControl;
      n_Logo: FormControl;
      cboxEmployeeName: FormControl;
      cboxBioURL: FormControl;
      cboxEmployeeTitle: FormControl;
      cboxFirmName: FormControl;
      cboxOfficeAddress: FormControl;
      cboxMainPhone: FormControl;
      cboxDirectPhone: FormControl;
      cboxMobilePhone: FormControl;
      cboxFax: FormControl;
      cboxEmail: FormControl;
      cboxLogo: FormControl;
    
    addCity: FormGroup;
      city: FormControl;
    
    constructor(
      private fb: FormBuilder
    ) {
      this.addCheckbox();
      this.addRadioButtons();
      this.addNewUser();
     }

    ngAfterViewInit() {

     }

    addCheckbox() {
      this.checkboxForm = this.fb.group({
        'EmployeeName':true,
        'EmployeeTitle':true,
        'FirmName':true,
        'OfficeAddress':true,
        'MainPhone': Boolean,
        'DirectPhone':true,
        'MobilePhone':true,
        'SupportedAttorneys': true,
        'Fax':true,
        'Email':true,
        'Logo':true,
        'BioURL':true,
        'EmployeeName_value': "",
        'EmployeeTitle_value': "",
        'FirmName_value': "",
        'OfficeAddress_value': "",
        'MainPhone_value': "",
        'DirectPhone_value': "",
        'MobilePhone_value': "",
        'SupportedAttorneys_value': "",
        'Fax_value': "",
        'Email_value': "",
        'Logo_value': "",
        
      });
    }

    addRadioButtons() {
      this.SignatureType = this.fb.group({
        sigtype: 'standard'
      });
    }

    addNewUser() {
      this.newUserForm = this.fb.group({
        'cboxEmployeeName':true,
        'cboxBioURL': true,
        'cboxEmployeeTitle':true,
        'cboxFirmName':true,
        'cboxOfficeAddress':true,
        'cboxMainPhone':true,
        'cboxDirectPhone':true,
        'cboxMobilePhone':true,
        'cboxSupportedAttorneys': true,
        'cboxFax':true,
        'cboxEmail':true,
        'cboxLogo':true,
        'city': "",
        'n_EmployeeName':"",
        'n_BioURL':null,
        'n_EmployeeTitle':null,
        'n_FirmName':null,
        'n_OfficeAddress':null,
        'n_MainPhone':null,
        'n_DirectPhone':null,
        'n_MobilePhone':null,
        'n_SupportedAttorneys':null,
        'n_Fax':null,
        'n_Email':"",
        'n_Logo':null,
        
      });
    }

    changeCheckBox(checkBox: string): boolean {
      let status;
      switch (checkBox) {
        case "MainPhone": 
          this.checkboxForm.value.MainPhone = false;
          status = this.checkboxForm.value.MainPhone;
          break;
        case "MobilePhone": 
          this.checkboxForm.value.MobilePhone = !this.checkboxForm.value.MobilePhone;
          status = this.checkboxForm.value.MobilePhone;
          break;

      }

      return status;
    }

    checkStatus() {
      this.checkboxForm = this.fb.group({
        'EmployeeName':true,
        'EmployeeTitle':true,
        'FirmName':true,
        'OfficeAddress':true,
        'MainPhone': this.MainPhone,
        'DirectPhone':true,
        'MobilePhone':true,
        'SupportedAttorneys': true,
        'Fax':true,
        'Email':true,
        'Logo':true,
        'BioURL':true,
        
      });
    }
    
    onChange: any = () => {}
    onTouch: any = () => {}
    val= "" // this is the updated value that the class accesses
    set value(val){  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
      this.val = val
      this.onChange(val)
      this.onTouch(val)
    }

    // this method sets the value programmatically
    writeValue(value: any){ this.value = value }

    // upon UI element value changes, this method gets triggered
    registerOnChange(fn: any){ this.onChange = fn }

    // upon touching the element, this method gets triggered
    registerOnTouched(fn: any){ this.onTouch = fn }
}
