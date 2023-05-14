import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { switchMap } from 'rxjs';
import { app } from 'src/app/app.module';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent {
  profileSetting: any;
  firestore = getFirestore(app);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.profileSetting = this.route.paramMap.pipe(
      switchMap(async (params) => {
        const name = params.get('name');
        if (!name) return;
        this.profileSetting = await this.getSetting(name);
      })
    );
  }

  async getSetting(name: string) {
    const docRef = doc(this.firestore, 'Backoffice', name);

    getDoc(docRef)
      .then((setting) => {
        if (setting.exists()) {
          return setting.data().List;
        }
      })
      .catch((Err) => {
        console.log('favdoc Err: ', Err);
      });
  }
}
