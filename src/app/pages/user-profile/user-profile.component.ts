import { Component } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from 'src/app/app.module';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  firestore = getFirestore(app);
  profileSettings: any;

  ngOnInit() {
    this.getSettings();
  }

  async getSettings() {
    const docRef = doc(this.firestore, 'Backoffice', 'Settings');

    getDoc(docRef)
      .then((settings) => {
        if (settings.exists()) {
          this.profileSettings = settings.data().List;
          console.log(this.profileSettings);
        }
      })
      .catch((Err) => {
        console.log('favdoc Err: ', Err);
      });
  }
}
