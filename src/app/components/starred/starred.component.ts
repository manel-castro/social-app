import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { app } from 'src/app/app.module';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.css'],
})
export class StarredComponent {
  firestore = getFirestore(app);
  auth = getAuth(app);
  starreds: any[];

  async ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      console.log(user?.uid);
      if (user?.uid) this.starreds = await this.getStarreds();
    });
    console.log('starreds: ', this.starreds);
  }

  async getStarreds() {
    const uid = this.auth.currentUser?.uid;
    console.log('uid: ', uid);
    if (!uid) return [];
    const collectionRef = collection(this.firestore, 'Users', uid, 'starred');

    return getDocs(collectionRef)
      .then(async (starredsRes) => {
        const starreds: any[] = [];
        starredsRes.forEach(async (starred) => {
          starreds.push({ id: starred.id, data: starred.data() });
        });
        console.log(starreds);
        return starreds;
      })
      .catch((Err) => {
        console.log('favdoc Err: ', Err);
        return [];
      });
  }
}
