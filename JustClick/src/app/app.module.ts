import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    provideFirebaseApp(() => {
      return initializeApp({
        apiKey: "AIzaSyC6yemd_TSuRAvJr8-tGlrvdQ0qbhhGaE8",
        authDomain: "justclick-dbd0c.firebaseapp.com",
        projectId: "justclick-dbd0c",
        storageBucket: "justclick-dbd0c.appspot.com",
        messagingSenderId: "145689752624",
        appId: "1:145689752624:web:13861b88e6d88fc5a729f5"
      });
    }),
    provideFirestore(() => {
      return getFirestore();
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule { }

