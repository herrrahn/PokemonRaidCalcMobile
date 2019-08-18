import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidsPage } from './raids.page';

describe('RaidsPage', () => {
  let component: RaidsPage;
  let fixture: ComponentFixture<RaidsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
