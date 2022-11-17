import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { addDoc, } from 'firebase/firestore';
import { doc } from '@angular/fire/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  documents: Array<any>;

  constructor(private firestore: Firestore, private loadingCtrl: LoadingController, private navCtrl: NavController,) {
    const collectionRefT = collection(firestore, 'login');
    collectionData(collectionRefT, { idField: 'details' }).subscribe(response => {
      this.documents = response;
      console.log(response);
    });
  }

  ngOnInit() {
  }
  addData(myForm) {
    const document = {
      username: myForm.username,
      pass: myForm.pass
    };
    const collectionRef = collection(this.firestore, 'login');
    addDoc(collectionRef, document);
  }
  async actionPage() {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const loading = await this.loadingCtrl.create({
      message: 'กำลังโหลด...',
      duration: 1900,
    });

    loading.present();
    await sleep(2000);
    this.navCtrl.navigateForward('tabs');
  }
}
