import { v4 as uuidv4 } from 'uuid';

import { Component, Inject } from '@angular/core';

import {
  Timestamp,
  doc,
  getFirestore,
  setDoc,
  documentId,
  onSnapshot,
  collection,
  orderBy,
  query,
} from 'firebase/firestore';
import { app } from 'src/app/app.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent {
  firestore = getFirestore(app);
  comments: Comment[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private postId: string) {}

  ngOnInit() {
    this.getComments();
  }

  isCommentCreator(comment: Comment) {
    // wether the user is the creator
    return comment.creatorId === AppComponent.getUserDocument()?.userId;
  }

  getComments() {
    const q = query(
      collection(this.firestore, 'Posts', this.postId, 'PostComments'),
      orderBy('timestamp', 'asc')
    ) as any;
    const unsubscribe = onSnapshot(q, (res: any) => {
      const posts = [];
      res.docChanges().forEach((postCommentDoc: any) => {
        if (postCommentDoc.type == 'added') {
          this.comments.push(postCommentDoc.doc.data() as Comment);
        }
      });
    });
  }

  onSendClick(commentInput: HTMLInputElement) {
    if (!commentInput.value.length) return;
    let postCommentId = uuidv4();

    setDoc(
      doc(this.firestore, 'Posts', this.postId, 'PostComments', postCommentId),
      {
        comment: commentInput.value,
        creatorId: AppComponent.getUserDocument()?.userId,
        creatorName: AppComponent.getUserDocument()?.publicName,
        timestamp: Timestamp.now(),
      }
    )
      .then((docId) => {
        commentInput.value = '';
      })
      .catch((err) => {});
  }
}

export interface Comment {
  creatorId: string;
  creatorName: string;
  comment: string;
  timestamp: Timestamp;
}
