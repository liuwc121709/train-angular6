import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PdfComponent } from './pdf/pdf.component';
import { EditorComponent } from './ueditor/ueditor.component';


import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UEditorModule } from 'ngx-ueditor';

@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    // PdfModule,
	PdfViewerModule,
	UEditorModule.forRoot({
		js: [
		  `./assets/ueditor/ueditor.all.min.js`,
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
