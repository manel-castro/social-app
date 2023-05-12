import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import {
  Auth,
  getAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from './app.module';
import { Router } from '@angular/router';
import { doc, getDoc, getFirestore, onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  auth: Auth = getAuth(app);
  db = getFirestore(app);

  title = 'social-app';
  userHasProfile = true;
  userDocument: UserDocument;

  constructor(private loginSheet: MatBottomSheet, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('user: ', user);
        if (!user.emailVerified) {
          this.router.navigate(['emailVerification']);
        } else {
          this.getUserProfile();
        }
      } else {
      }
    });
  }

  loggedIn() {
    return !!this.auth.currentUser;
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }

  onLogoutClick() {
    this.auth.signOut();
  }

  getUserProfile() {
    onSnapshot(doc(this.db, 'Users', this.auth.currentUser!.uid), (doc) => {
      console.log('doc', doc);
      this.userDocument = <UserDocument>doc.data();
      this.userHasProfile = doc.exists();
      if (this.userHasProfile) {
        this.router.navigate(['postfeed']);
      }
    });
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
}
