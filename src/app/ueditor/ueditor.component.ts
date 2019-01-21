import { Component, OnInit, ViewChild } from '@angular/core';
import { UEditorComponent } from 'ngx-ueditor';


@Component({
  selector: 'app-example-ueditor',
  templateUrl: './ueditor.component.html',
  styleUrls: ['./ueditor.component.css']
})

export class EditorComponent  implements OnInit {
  @ViewChild('ueditor') ueditor: UEditorComponent;


  constructor() {
  }

  ngOnInit() {
  }

  getAllHtml() {
    // 通过 `this.full.Instance` 访问ueditor实例对象
    alert(this.ueditor.Instance.getAllHtml());
  }
}
