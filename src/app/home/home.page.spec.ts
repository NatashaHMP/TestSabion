import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AppModule } from '../app.module';
import { IonicModule } from '@ionic/angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const nameFieldsRequired = [ 
    'name', 'lastName', 'address', 'addressNumber', 'zipCode', 'city', 'uf', 'phone', 'email'];

  const nameFieldsSimple = [ 
    'name', 'lastName', 'address', 'city'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [ 
        CommonModule,
        ReactiveFormsModule,
        AppModule,
        RouterTestingModule,
        IonicModule
      ],
      providers: [
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  nameFieldsRequired.forEach(name => {
    it(name + ' field required', () => {
      let errors = {};
      let field = component.userForm.controls[name];
      errors = field.errors || {};
      expect(errors['required']).toBeTruthy();
    });
  });

  nameFieldsSimple.forEach(name => {
    it(name + ' field valid', () => {
      let field = component.userForm.controls[name];
      field.setValue("Test");
      expect(field.valid).toBeTruthy();
    });
  });

  it('addressNumber field valid', () => {
    let field = component.userForm.controls['addressNumber'];
    field.setValue("123");
    expect(field.valid).toBeTruthy();
  });

  it('addressNumber field invalid', () => {
    let errors = {};
    let field = component.userForm.controls['addressNumber'];
    field.setValue("test")
    errors = field.errors || {};
    expect(field.valid).toBeFalsy();
  });

  it('zipCode field valid', () => {
    let zipCode = component.userForm.controls['zipCode'];
    zipCode.setValue("65076420");
    expect(zipCode.valid).toBeTruthy();
  });

  it('zipCode field not number', () => {
    let errors = {};
    let field = component.userForm.controls['zipCode'];
    field.setValue("test")
    errors = field.errors || {};
    expect(field.valid).toBeFalsy();
  });

  it('zipCode field invalid', () => {
    let errors = {};
    let field = component.userForm.controls['zipCode'];
    field.setValue("24687")
    errors = field.errors || {};
    expect(field.valid).toBeFalsy();
  });

  it('uf field valid', () => {
    let uf = component.userForm.controls['uf'];
    uf.setValue("SP");
    expect(uf.valid).toBeTruthy();
  });

  it('uf field is number error', () => {
    let errors = {};
    let field = component.userForm.controls['uf'];
    field.setValue("12")
    errors = field.errors || {};
    expect(field.valid).toBeFalsy();
  });

  it('uf field min length error', () => {
    let errors = {};
    let field = component.userForm.controls['uf'];
    field.setValue("S")
    errors = field.errors || {};
    expect(field.valid).toBeFalsy();
  });

  it('phone field valid', () => {
    let phone = component.userForm.controls['phone'];
    phone.setValue("11111111");
    expect(phone.valid).toBeTruthy();
  });

  it('phone field min length error', () => {
    let errors = {};
    let field = component.userForm.controls['phone'];
    field.setValue("12345")
    errors = field.errors || {};
    expect(field.valid).toBeFalsy();
  });

  it('phone field not number error', () => {
    let errors = {};
    let field = component.userForm.controls['phone'];
    field.setValue("12345")
    errors = field.errors || {};
    expect(field.valid).toBeFalsy();
  });

  it('email field valid', () => {
    let email = component.userForm.controls['email'];
    email.setValue("test@test.com");
    expect(email.valid).toBeTruthy();
  });

  it('email field not have @', () => {
    let errors = {};
    let field = component.userForm.controls['email'];
    field.setValue("12345")
    errors = field.errors || {};
    expect(field.valid).toBeFalsy();
  });

  it('email field not have .com', () => {
    let errors = {};
    let field = component.userForm.controls['email'];
    field.setValue("12345@123")
    errors = field.errors || {};
    expect(field.valid).toBeFalsy();
  });
});
