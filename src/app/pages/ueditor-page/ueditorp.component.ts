import {Component, OnInit, Input} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';

// @Injectable()
@Component({
  selector: 'app-ueditorp',
  templateUrl: './ueditorp.component.html',
  styleUrls: ['./ueditorp.component.css']
})
export class UeditorpComponent implements OnInit {

    constructor(private router: Router, private http: HttpClient) {
	}
  
  
	ngOnInit() {
  
	}
}
