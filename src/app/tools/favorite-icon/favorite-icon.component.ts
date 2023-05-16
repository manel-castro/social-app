import { v4 as uuidv4 } from 'uuid';

import { Component, Input } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import {
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { app } from 'src/app/app.module';
import { AppComponent } from 'src/app/app.component';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrls: ['./favorite-icon.component.css'],
})
export class FavoriteIconComponent {
  @Input() postData: PostData;

  firestore = getFirestore(app);
  auth = getAuth(app);
  isMarkedFavorite = false;

  async ngOnInit() {
    await this.checkIsFavorite();
  }

  checkIsFavorite() {
    console.log('hapened favDoc');

    if (!this.auth.currentUser?.uid || !this.postData?.postId) return;

    console.log('loged favDoc');
    const userId = this.auth.currentUser?.uid;

    const docRef = doc(
      this.firestore,
      'Posts',
      this.postData.postId,
      'PostLikes',
      userId!
    );

    return getDoc(docRef)
      .then((favDoc) => {
        if (favDoc.exists()) {
          console.log('exists favDoc');

          this.isMarkedFavorite = true;
          return true;
        }
        this.isMarkedFavorite = false;
        return false;
        console.log('worked favdoc');
      })
      .catch((Err) => {
        console.log('favdoc Err: ', Err);
      });
  }

  async onFavoriteClick() {
    console.log('postData:', this.postData);

    if (!AppComponent.getUserDocument()?.userId) return;

    const isFavorite = await this.checkIsFavorite();

    const docRef = doc(
      this.firestore,
      'Posts',
      this.postData.postId,
      'PostLikes',
      AppComponent.getUserDocument()!.userId!
    );

    if (isFavorite) {
      deleteDoc(docRef)
        .then((docId) => {
          this.isMarkedFavorite = false;
        })
        .catch((err) => {});
    } else {
      setDoc(docRef, {
        creatorName: AppComponent.getUserDocument()?.publicName,
        timestamp: Timestamp.now(),
      })
        .then((docId) => {
          this.isMarkedFavorite = true;
        })
        .catch((err) => {});
    }
  }
}

export interface FavDoc {
  creatorName: string;
  timestamp: Timestamp;
}
