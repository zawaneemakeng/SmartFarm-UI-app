import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  documents: Array<any>;
  constructor(private firestore: Firestore, private loadingCtrl: LoadingController, private navCtrl: NavController) {
    const collectionRefT = collection(firestore, 'login');
    collectionData(collectionRefT, { idField: 'details' }).subscribe(response => {
      this.documents = response;
      console.log(response);

    });
  }
  ngOnInit() {
  }
  actionPage() {
    this.navCtrl.navigateForward('details');
  }
}
