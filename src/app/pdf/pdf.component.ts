import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'example-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})

export class PdfComponent  implements OnInit{
  pdfPath: '';
  pdfSrc: '';
  page: 1;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Render PDF preview on selecting file
   */
  onFileSelected() {
    const $pdf: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        this.pdfPath = $pdf.value;
      };

      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }
}