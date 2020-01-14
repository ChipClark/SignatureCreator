import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, concat } from 'rxjs/operators';

import { Person, } from './datatables/person';
import { MessageService } from './message.service';
import { Schools, Education, DegreeTypes } from './datatables/school';
import { OfficeLocation, RoomLocation } from './datatables/officelocation';
import { LegalSubDepartments } from './datatables/departmenttables';
 
@Injectable({
  providedIn: 'root'
})

export class APIService {

  public onPremURL = 'http://am-web05:3035/api/v1/';
  // public azureURL = 'https://amazng-webapi.azurewebsites.net/api/';
  public debug = true;

  public baseURL = this.onPremURL;

  private limit = 20;
  people: Person[];
  schools: Schools[];
  education: Education[];
  degrees: DegreeTypes[];
  floors: RoomLocation[];
  officeLocation: OfficeLocation[];
  location: RoomLocation[];
  
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService){ }
 


  getDATA (url): Observable<Person[]> {
    url = this.baseURL + url;
    // if (this.debug == true)  console.log(url);
    return this.http.get<Person[]>(url)
      .pipe(
        tap(people => this.log(this.limit + " people returned")),
        catchError(this.handleError('getPeople', [])),
      );
  }

 
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a StaffService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StaffService: ${message}`);
  }
}