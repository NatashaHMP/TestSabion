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
  public userForm: FormGroup;

  public imageUrl: string = "assets/imgs/emptyAvatar.png";
  public perfilImageUrl: string = "assets/imgs/emptyAvatar.png";

  public patternLetters = "[a-zA-Z]+";
  public patternNumbers = "^[1-9][0-9]*$";
  public patternZipCode = "^[0-9]{2}[.][0-9]{3}[-][0-9]{3}$";    //99.999-999
  public patternPhone = "^[(][0-9]{2}[)][ ][0-9]{4}[-][0-9]{4}$";    //(99) 9999-9999
  public patternCellphone = "^[(][0-9]{2}[)][ ][0-9]{5}[-][0-9]{4}$";    //(99) 99999-9999

  constructor(
    private formBuilder: FormBuilder, 
    public alertController: AlertController,
    private imagePicker: ImagePicker
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.patternLetters)]],
      lastName: ['', [Validators.required, Validators.pattern(this.patternLetters)]],
      address: ['', Validators.required],
      addressNumber: ['', [Validators.required, Validators.pattern(this.patternNumbers)]],
      complement: [''],
      zipCode: ['', [Validators.required, Validators.pattern(this.patternZipCode), Validators.minLength(8)]],
      city: ['', Validators.required],
      uf: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.patternLetters)]],
      phone: ['', [Validators.required, Validators.pattern(this.patternPhone), Validators.minLength(10)]],
      cellphone: ['', [Validators.pattern(this.patternCellphone), Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      useAvatarPicture: [false]
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

  async showAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  submitForm() {
    if (!this.userForm.valid) {
      return;
    }

    if (this.userForm.controls['useAvatarPicture'].value) {
      this.perfilImageUrl = this.imageUrl;
    }

    this.showAlert("Cadastro realizado com sucesso!");
  } 
}
