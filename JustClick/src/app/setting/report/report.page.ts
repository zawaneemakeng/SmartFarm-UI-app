import { Component, OnInit } from '@angular/core';
import { addDoc, } from 'firebase/firestore';
import { doc } from '@angular/fire/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  temp: Array<any>;
  humid: Array<any>;


  constructor(private firestore: Firestore,) {
    const collectionRefH = collection(firestore, 'details_h');
    collectionData(collectionRefH, { idField: 'details' }).subscribe(response => {
      this.humid = response;
      console.log(response);

    });
    const collectionRefT = collection(firestore, 'details_t');
    collectionData(collectionRefT, { idField: 'details' }).subscribe(response => {
      this.temp = response;
      console.log(response);

    });

  }
  ngOnInit() {
  }

}
