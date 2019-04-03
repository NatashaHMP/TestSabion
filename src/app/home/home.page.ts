import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public userForm : FormGroup;

  constructor(private formBuilder: FormBuilder, public alertController: AlertController) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      addressNumber: ['', Validators.required],
      complement: [''],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      uf: ['', Validators.required],
      phone: ['', Validators.required],
      cellphone: [''],
      email: ['', Validators.required]
    });
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      message: 'Erro ao enviar o formulário',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      message: 'Formulário enviado com sucesso',
      buttons: ['Okay']
    });

    await alert.present();
  }

  submitForm() {
    if (!this.userForm.valid) {
      this.showErrorAlert();
      return;
    }

    this.showSuccessAlert();
  }
}
