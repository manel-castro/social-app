import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
import {
  getFirestore,
  query,
  collection,
  doc,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { app } from 'src/app/app.module';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css'],
})
export class PostFeedComponent {
  firestore = getFirestore(app);
  posts: PostData[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.getPosts();
  }

  onCreatePostClick() {
    this.dialog.open(CreatePostComponent);
  }

  async getPosts() {
    const q = query(
      collection(this.firestore, 'Posts'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const post = <PostData>doc.data();
        post.postId = doc.id;
        this.posts.push(post);
      });
    } catch (e) {}
  }
}

export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl?: string;
  postId: string;
}
