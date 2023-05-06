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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'social-app';

  auth: Auth = getAuth(app);

  constructor(private loginSheet: MatBottomSheet) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('user: ', user);
      } else {
      }
    });
  }

  loggedIn() {
    return this.auth.currentUser!!;
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }

  onLogoutClick() {
    this.auth.signOut();
  }
}
