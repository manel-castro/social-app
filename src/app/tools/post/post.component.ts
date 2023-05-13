import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from 'src/app/app.module';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() postData: PostData;

  creatorName: string;
  creatorDescription: string;
  firestore = getFirestore(app);

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.getCreatorInfo();
  }

  onReplyClick() {
    this.dialog.open(ReplyComponent, { data: this.postData.postId });
  }

  async getCreatorInfo() {
    const res = await getDoc(
      doc(this.firestore, 'Users', this.postData.creatorId)
    );
    const userDocument = res.data();

    this.creatorName = userDocument?.publicName;
    this.creatorDescription = userDocument?.description;
  }
}
