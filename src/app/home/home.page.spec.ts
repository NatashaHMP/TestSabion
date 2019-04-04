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
    'name', 'lastName', 'address', 'city', 'complement'];

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

  it('name field (number) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['name'];
    field.setValue("13342");
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('name field (special characters, letters) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['name'];
    field.setValue("Skfj^-$");
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('name field (number, letters, special characters) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['name'];
    field.setValue("13342dsdS");
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('lastName field (number) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['lastName'];
    field.setValue("13342");
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('lastName field (special characters, letters) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['lastName'];
    field.setValue("Skfj^-$");
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('lastName field (number, letters, special characters) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['lastName'];
    field.setValue("13342dsdS");
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('complement field (not required) = valid', () => {
    let errors = {};
    let field = component.userForm.controls['complement'];
    field.setValue("13342dsidjS");
    errors = field.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('cellphone field (not required) = valid', () => {
    let errors = {};
    let field = component.userForm.controls['cellphone'];
    errors = field.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  nameFieldsRequired.forEach(name => {
    it(name + ' field (required) = valid', () => {
      let errors = {};
      let field = component.userForm.controls[name];
      errors = field.errors || {};
      expect(errors['required']).toBeTruthy();
    });
  });

  nameFieldsSimple.forEach(name => {
    it(name + ' field (letters) = valid', () => {
      let field = component.userForm.controls[name];
      field.setValue("Test");
      expect(field.valid).toBeTruthy();
    });
  });

  it('addressNumber field (number) = valid', () => {
    let field = component.userForm.controls['addressNumber'];
    field.setValue("123");
    expect(field.valid).toBeTruthy();
  });

  it('addressNumber field (not number) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['addressNumber'];
    field.setValue("test")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('addressNumber field (letters with number) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['addressNumber'];
    field.setValue("test234")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('addressNumber field (with ",") = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['addressNumber'];
    field.setValue("12,3")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('addressNumber field (with ".") = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['addressNumber'];
    field.setValue("12.3")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('zipCode field (formatt: 99.999-999) = valid', () => {
    let zipCode = component.userForm.controls['zipCode'];
    zipCode.setValue("65.076-420");
    expect(zipCode.valid).toBeTruthy();
  });

  it('zipCode field (not number) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['zipCode'];
    field.setValue("test")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('zipCode field (letters with numbers) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['zipCode'];
    field.setValue("test1232")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('zipCode field (< minLength) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['zipCode'];
    field.setValue("24687")
    errors = field.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('zipCode field (with ".") = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['zipCode'];
    field.setValue("650764.0")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('zipCode field (with ",") = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['zipCode'];
    field.setValue("650764,0")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('uf field (2 letters) = valid', () => {
    let uf = component.userForm.controls['uf'];
    uf.setValue("sp");
    expect(uf.valid).toBeTruthy();
  });

  it('uf field (number) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['uf'];
    field.setValue("12")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('uf field (< minlength) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['uf'];
    field.setValue("S")
    errors = field.errors || {};
    console.log(errors);
    expect(errors['minlength']).toBeTruthy();
  });

  it('phone field (formatt: (99) 9999-9999) = valid', () => {
    let phone = component.userForm.controls['phone'];
    phone.setValue("(11) 1111-1111");
    if (phone.errors) {
      console.log(phone.errors);
    }
    expect(phone.valid).toBeTruthy();
  });

  it('phone field (letters) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['phone'];
    field.setValue("rer")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('phone field (number without format) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['phone'];
    field.setValue("111111111")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('phone field (< minlength) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['phone'];
    field.setValue("11111")
    errors = field.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('cellphone field (formatt: (99) 99999-9999) = valid', () => {
    let phone = component.userForm.controls['cellphone'];
    phone.setValue("(11) 11111-1111");
    if (phone.errors) {
      console.log(phone.errors);
    }
    expect(phone.valid).toBeTruthy();
  });

  it('cellphone field (letters) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['cellphone'];
    field.setValue("rer")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('cellphone field (number withou formatt) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['cellphone'];
    field.setValue("1111111111")
    errors = field.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('cellphone field (< minlength) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['cellphone'];
    field.setValue("1111111")
    errors = field.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('email field (formatt: email) = valid', () => {
    let email = component.userForm.controls['email'];
    email.setValue("test@test.com");
    expect(email.valid).toBeTruthy();
  });

  it('email field (without formatt) = invalid', () => {
    let errors = {};
    let field = component.userForm.controls['email'];
    field.setValue("12345")
    errors = field.errors || {};
    expect(errors['email']).toBeTruthy();
  });
});
