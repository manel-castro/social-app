import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from 'src/app/app.module';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
})
export class AuthenticatorComponent {
  state = AuthenticatorCompState.LOGIN;
  firebaseAuth: Auth;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private router: Router
  ) {
    this.firebaseAuth = getAuth(app);
  }

  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement
  ) {
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

    if (
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)
    ) {
      createUserWithEmailAndPassword(this.firebaseAuth, email, password)
        .then((suc) => {
          registerEmail.value = '';
          registerPassword.value = '';
          registerConfirmPassword.value = '';
          this.bottomSheetRef.dismiss();
        })
        .catch((err) => {
          alert(`Failed to create the account. ${err}`);
        });
    }
  }

  onLogin(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
    const email = loginEmail.value;
    const password = loginPassword.value;

    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      signInWithEmailAndPassword(this.firebaseAuth, email, password)
        .then((suc) => {
          this.router.navigate(['postfeed']);

          this.bottomSheetRef.dismiss();
        })
        .catch((err) => {
          alert(`failed to login ${err}`);
        });
    }
  }

  onResetClick(resetEmail: HTMLInputElement) {
    const email = resetEmail.value;

    if (this.isNotEmpty(email)) {
      sendPasswordResetEmail(this.firebaseAuth, email)
        .then((suc) => this.bottomSheetRef.dismiss())
        .catch((err) => alert(`reset email failed ${err}`));
    }
  }

  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWidth: string) {
    return text == comparedWidth;
  }

  onForgotPasswordClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState() {
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText() {
    switch (this.state) {
      case AuthenticatorCompState.LOGIN:
        return 'Login';
      case AuthenticatorCompState.REGISTER:
        return 'Register';
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return 'Forgot password';
    }
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
}
