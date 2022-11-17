import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  noti: Array<any>;
  noti_sucsess: Array<any>;

  constructor(private firestore: Firestore,) {
    const collectionRef = collection(firestore, 'notification_info');
    collectionData(collectionRef, { idField: 'notification' }).subscribe(response => {
      this.noti = response;
      console.log(response);

    });
    const collectionRefW = collection(firestore, 'water_plant');
    collectionData(collectionRefW, { idField: 'details' }).subscribe(response => {
      this.noti_sucsess = response;
      console.log(response);

    });
  }
  ngOnInit() {

  }
}
