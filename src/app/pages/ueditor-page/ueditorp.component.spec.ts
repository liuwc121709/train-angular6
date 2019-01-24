import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UeditorpComponent} from './ueditorp.component';

describe('UeditorpComponent', () => {
  let component: UeditorpComponent;
  let fixture: ComponentFixture<UeditorpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeditorpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeditorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
