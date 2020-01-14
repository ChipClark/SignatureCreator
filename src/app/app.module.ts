import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIService} from './api.service'; 
import { MatTooltipModule } from '@angular/material';

import { SignatureComponent } from './signature/signature.component';
import { MaterialModule } from './material/material.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatSelectModule, MatRadioModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SignatureComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatTooltipModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule

  ],
  exports: [
    MatRadioModule
  ],
  providers: [ 
    APIService,
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => SignatureComponent),
      multi: true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
