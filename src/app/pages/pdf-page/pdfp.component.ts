import {Component, OnInit, Input} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';

// @Injectable()
@Component({
  selector: 'app-pdfp',
  templateUrl: './pdfp.component.html',
  styleUrls: ['./pdfp.component.css']
})
export class PdfpComponent implements OnInit {

    constructor(private router: Router, private http: HttpClient) {
	}
  
  
	ngOnInit() {
  
	}
}
