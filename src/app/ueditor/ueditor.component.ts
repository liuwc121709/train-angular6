import {
  Component,
  EventEmitter,
  OnDestroy,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { UEditorComponent } from 'ngx-ueditor';


@Component({
  selector: 'app-example-ueditor',
  templateUrl: './ueditor.component.html',
  styleUrls: ['./ueditor.component.css']
})

export class EditorComponent  implements OnInit , OnDestroy {
  @Input() ueditor_content: String;
  @Output() onEditorContentChange = new EventEmitter();

  ueditorInstant;

  setting = {
	toolbars: [
		['fullscreen', 'source', 'undo', 'redo'],
		['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
	],
	autoClearinitialContent: true,
    wordCount: false
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ueditorInstant.destroy();
  }

  ueditorReady(comp: UEditorComponent) {
    this.ueditorInstant = comp.Instance;
    console.log('ueditorInstant-id:' + this.ueditorInstant.uid);
  }

  ueditorChange(value: string) {
    this.onEditorContentChange.emit(value);
 }

}
