import { v4 as uuidv4 } from 'uuid';

import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import {
  doc,
  getFirestore,
  setDoc,
  FieldValue,
  Timestamp,
} from 'firebase/firestore';
import { app } from 'src/app/app.module';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  selectedImageFile: File;

  auth = getAuth(app);
  firestore = getFirestore(app);
  storage = getStorage(app);

  constructor(private dialog: MatDialogRef<CreatePostComponent>) {}

  onPostClick(commentInput: HTMLTextAreaElement) {
    let comment = commentInput.value;

    if (!comment.length) return;

    if (this.selectedImageFile) {
      this.uploadImagePost(comment);
    } else {
      this.uploadPost(comment);
    }
  }

  uploadImagePost(comment: string) {
    let postId = uuidv4();

    const storageRef = ref(this.storage, `Posts/${postId}/image`);
    uploadBytes(storageRef, this.selectedImageFile)
      .then((res) => {
        getDownloadURL(storageRef).then((res) => {
          setDoc(doc(this.firestore, 'Posts', postId), {
            comment,
            creatorId: this.auth.currentUser?.uid,
            imageUrl: res,
            timestamp: Timestamp.now(),
          })
            .then((docId) => {
              this.dialog.close();
            })
            .catch((err) => {});
        });
      })
      .catch((err) => {
        console.log(err);

        alert('fail');
      });
  }

  uploadPost(comment: string) {
    let postId = uuidv4();

    setDoc(doc(this.firestore, 'Posts', postId), {
      comment,
      creatorId: this.auth.currentUser?.uid,

      timestamp: Timestamp.now(),
    })
      .then((docId) => {
        this.dialog.close();
      })
      .catch((err) => {});
  }

  onPhotoSelected(photoSelector: HTMLInputElement) {
    if (!photoSelector.files) return;

    this.selectedImageFile = photoSelector.files[0];

    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener('loadend', (e) => {
      if (!fileReader.result) return;

      let readableString = fileReader.result?.toString();
      let postPreviewImage = <HTMLImageElement>(
        document.getElementById('post-preview-image')
      );
      postPreviewImage.src = readableString;
    });
  }
}
