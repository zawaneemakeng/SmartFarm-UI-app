import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { addDoc, } from 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  randomNumber_t;
  randomNumber_h;
  temp: Array<any>;
  humid: Array<any>;
  ids: number[] = [];
  resume: boolean = false;
  sucsess: Array<any>;


  constructor(private firestore: Firestore, private loadingCtrl: LoadingController, private alertController: AlertController) {
    const collectionRefT = collection(firestore, 'details_t');
    collectionData(collectionRefT, { idField: 'details' }).subscribe(response => {
      this.temp = response;
      console.log(response);

    });
    const collectionRefH = collection(firestore, 'details_h');
    collectionData(collectionRefH, { idField: 'details' }).subscribe(response => {
      this.humid = response;
      console.log(response);

    });
    const collectionRefW = collection(firestore, 'water_plant');
    collectionData(collectionRefW, { idField: 'details' }).subscribe(response => {
      this.sucsess = response;
      console.log(response);

    });
  }
  ngOnInit() {
    this.randomNumber_h = (Math.random() * (100 - 10) + 10).toFixed(2);
    this.randomNumber_t = (Math.random() * (40 - 20) + 20).toFixed(2);
    setInterval(() => {
      if (this.resume) {
        this.schedule();
      }
    }, 10000)
  }
  schedule() {
    var date = new Date();
    let id = this.ids.length;
    this.ids.push(id);
    let options: ScheduleOptions = {
      notifications: [{
        id: id,
        title: "รดน้ำสำเร็จ",
        body: "ดลิกเพื่อดูเพิ่มเติม",
      }]
    }


    if (this.resume) {
      LocalNotifications.schedule(options).then(() => {
        const details_s = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          date: date.getDate(),
          months: date.getMonth(),
          year: date.getFullYear(),
          sucsess: "เเปลงที่ 1 รดน้ำสำเร็จ"
        };
        const collectionRefN = collection(this.firestore, 'water_plant');
        addDoc(collectionRefN, details_s);
      })
    }
    this.resume = false;
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'เเจ้งเตือน',
      subHeader: 'ทำการเปิดวาล์วน้ำ',
      message: '10 วินาที',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async showLoadingT() {
    var date = new Date();
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const loading = await this.loadingCtrl.create({
      message: 'กรุณารอสักครู่...',
      duration: 1000,

    });

    loading.present();
    await sleep(1500);
    this.randomNumber_t = (Math.random() * (40 - 20) + 20).toFixed(2);
    const details = {
      temp: this.randomNumber_t,
      hour: date.getHours(),
      minutes: date.getMinutes(),
      date: date.getDate(),
      months: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    const collectionRefT = collection(this.firestore, 'details_t');
    addDoc(collectionRefT, details);
  }


  async showLoadingH() {
    var date = new Date();
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const loading = await this.loadingCtrl.create({
      message: 'กรุณารอสักครู่...',
      duration: 1000,

    });

    loading.present();
    await sleep(1500);
    this.randomNumber_h = (Math.random() * (100 - 10) + 10).toFixed(2);
    const details = {
      hour: date.getHours(),
      minutes: date.getMinutes(),
      date: date.getDate(),
      months: date.getMonth() + 1,
      year: date.getFullYear(),
      humid: this.randomNumber_h,
    };
    const collectionRefH = collection(this.firestore, 'details_h');
    addDoc(collectionRefH, details);
  }

}
