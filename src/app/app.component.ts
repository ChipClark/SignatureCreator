import { Component, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from'@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterLink, Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable({
  providedIn: 'root'
})



export class AppComponent {
  title = 'Email Signature Creator';
  private authRslt: string = '';
  private authBack: string = 'grey';
  private postRslt: string = '';
  private postBack: string = 'grey';

  router: RouterLink;


  constructor (
    private http: HttpClient,
    private route: ActivatedRoute,
    private _router: Router,
   ){ };

  
  
  ngOnInit() {}
   
}
