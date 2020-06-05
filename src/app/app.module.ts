import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UEditorModule } from 'ngx-ueditor';

// component
import {PdfComponent} from './@theme/components/pdf/pdf.component';
import {UEditorxComponent} from './@theme/components/ueditor/ueditor.component';
import {MapComponent} from './@theme/components/map/map.component';

// pages
import {PdfpComponent} from './pages/pdf-page/pdfp.component';
import {UeditorpComponent} from './pages/ueditor-page/ueditorp.component';
import {MappComponent} from './pages/map-page/mapp.component';


@NgModule({
  declarations: [
	AppComponent,
	PdfpComponent,
	UeditorpComponent,
	PdfComponent,
	UEditorxComponent,
	MapComponent,
	MappComponent
  ],
  imports: [
	BrowserModule,
	FormsModule,
	AppRoutingModule,
	HttpClientModule,
    // PdfModule,
	PdfViewerModule,
	UEditorModule.forRoot({
		js: [
		  `./assets/ueditor/ueditor.all.js`,
		  `./assets/ueditor/ueditor.config.js`,
		],
		// 默认前端配置项
		options: {
		  UEDITOR_HOME_URL: './assets/ueditor/'
		}
	  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
