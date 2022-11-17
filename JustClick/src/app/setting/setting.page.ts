import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc, } from 'firebase/firestore';
import { doc } from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  username: Array<any>;
  noti: Array<any>;
  ids: number[] = [];
  resume: boolean = false;
  constructor(private firestore: Firestore, private navCtrl: NavController, private alertController: AlertController) {
    const collectionRef = collection(firestore, 'login');
    collectionData(collectionRef, { idField: 'doc_id' }).subscribe(response => {
      this.username = response;
      console.log(response);
    });
    const collectionRefN = collection(firestore, 'notification_info');
    collectionData(collectionRefN, { idField: 'notification' }).subscribe(response => {
      this.noti = response;
      console.log(response);
    });
  }
  ngOnInit() {
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
        title: "ได้เวลารดน้ำต้นไม้",
        body: "ต้นไม้ของคุณรอคุณอยู่",
      }]
    }


    if (this.resume) {
      LocalNotifications.schedule(options).then(() => {
        const details_n = {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          date: date.getDate(),
          months: date.getMonth(),
          year: date.getFullYear(),
          title: "ได้เวลารดน้ำต้นไม้"
        };
        const collectionRefN = collection(this.firestore, 'notification_info');
        addDoc(collectionRefN, details_n);
      })
    }
  }
  deleteData(documentID) {
    const documentRef = doc(this.firestore, 'login/' + documentID);
    deleteDoc(documentRef);
    this.navCtrl.navigateForward('welcome');
  }
  actionPageR() {
    this.navCtrl.navigateForward('report');
  }
  async presentAlert() {
    if (this.resume == false) {
      const alert = await this.alertController.create({
        header: 'เเจ้งเตือน',
        subHeader: 'เปิดการเเจ้งเตือนเมื่อถึงเวลารดน้ำ',
        message: 'สามารถปิดได้ทุกเวลา',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}

