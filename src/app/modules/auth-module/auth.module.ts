import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseOptions } from '@angular/fire/app';

import { SharedModule } from './shared-module/shared.module';

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCwXlaB6d97Lvf92zl0BlgNyqaTCqD_ddw",
  authDomain: "fitness-org.firebaseapp.com",
  databaseURL: "https://fitness-org-default-rtdb.firebaseio.com",
  projectId: "fitness-org",
  storageBucket: "fitness-org.appspot.com",
  messagingSenderId: "559502421735",
  appId: "1:559502421735:web:9231b5f32f94d559f6bc42"
};

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ],
  providers: [],
  declarations: []
})
export class AuthModule { }
