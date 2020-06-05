import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';


import {PdfpComponent} from './pages/pdf-page/pdfp.component';
import {UeditorpComponent} from './pages/ueditor-page/ueditorp.component';
import {MappComponent} from './pages/map-page/mapp.component';

const routes: Routes = [
	  {
		path: 'pdfp',
		component: PdfpComponent,
	  },
	  {
		path: 'ueditorp',
		component: UeditorpComponent,
	  },
	  {
		path: 'mapp',
		component: MappComponent,
	  },
	  {
		path: '',
		redirectTo: 'pdfp',
		pathMatch: 'full',
	  }
  ];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
