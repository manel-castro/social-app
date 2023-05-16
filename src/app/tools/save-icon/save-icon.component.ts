import { Component, Input } from '@angular/core';
import { getAuth } from 'firebase/auth';
import {
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { app } from 'src/app/app.module';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';

@Component({
  selector: 'app-save-icon',
  templateUrl: './save-icon.component.html',
  styleUrls: ['./save-icon.component.css'],
})
export class SaveIconComponent {
  @Input() postData: PostData;
  isStarred = false;

  db = getFirestore(app);
  auth = getAuth(app);

  async ngOnInit() {
    await this.getIsStarred();
  }

  getIsStarred() {
    if (!this.auth.currentUser || !this.postData?.postId) return;

    const docRef = doc(
      this.db,
      'Users',
      this.auth.currentUser!.uid,
      'starred',
      this.postData.postId
    );

    return getDoc(docRef).then((res) => {
      if (res.exists()) {
        this.isStarred = true;
        return true;
      } else {
        this.isStarred = false;
        return false;
      }
    });
  }

  async onClickStarred() {
    if (!this.auth.currentUser || !this.postData?.postId) return;

    const _isStarred = await this.getIsStarred();

    const docRef = doc(
      this.db,
      'Users',
      this.auth.currentUser!.uid,
      'starred',
      this.postData.postId
    );

    console.log('_isStarred', _isStarred);
    if (_isStarred) {
      deleteDoc(docRef).then((docId) => {
        this.isStarred = false;
      });
    } else {
      setDoc(docRef, {
        timestamp: Timestamp.now(),
        post: this.postData,
      })
        .then((docId) => {
          this.isStarred = true;
        })
        .catch((err) => {});
    }
  }
}
