import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, getAuth, sendEmailVerification } from 'firebase/auth';
import { app } from 'src/app/app.module';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent {
  auth: Auth = getAuth(app);

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.auth?.currentUser && !this.auth.currentUser.emailVerified) {
      sendEmailVerification(this.auth.currentUser);
    } else {
      this.router.navigate(['']);
    }
  }

  onResendClick() {
    if (this.auth?.currentUser) sendEmailVerification(this.auth.currentUser);
  }
}
