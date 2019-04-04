import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public userForm : FormGroup;
  public phonePattern = "\([0-9]{2}\) [0-9]{4,6}-[0-9]{3,4}$";
  public imageUrl = "assets/imgs/emptyAvatar.png";
  public perfilImageUrl = "assets/imgs/emptyAvatar.png";
  public usePerfilImage: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    public alertController: AlertController,
    private imagePicker: ImagePicker
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      address: ['', Validators.required],
      addressNumber: ['', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      complement: [''],
      zipCode: ['', [Validators.required, Validators.pattern("^[0-9]{2}[.][0-9]{3}[-][0-9]{3}$"), Validators.minLength(8)]],
      city: ['', Validators.required],
      uf: ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z]+")]],
      phone: ['', [Validators.required, Validators.pattern("^[(][0-9]{2}[)][ ][0-9]{4}[-][0-9]{4}$"), Validators.minLength(10)]],
      cellphone: ['', [Validators.pattern("^[(][0-9]{2}[)][ ][0-9]{5}[-][0-9]{4}$"), Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async changeImage() {
    let options = {
      maximumImagesCount: 1
    }

    this.imagePicker.getPictures(options).then((results) => {
      this.imageUrl = results[0];
    }, (err) => { });
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
      console.log(this.userForm);
      this.showErrorAlert();
      return;
    }

    if (this.usePerfilImage) {
      this.perfilImageUrl = this.imageUrl;
    }

    this.showSuccessAlert();
  } 
}
