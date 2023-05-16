import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

import { HomeComponent } from './pages/home/home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ProfileComponent } from './tools/profile/profile.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { PostComponent } from './tools/post/post.component';
import { ReplyComponent } from './tools/reply/reply.component';
import { FavoriteIconComponent } from './tools/favorite-icon/favorite-icon.component';
import { SaveIconComponent } from './tools/save-icon/save-icon.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { HttpClientModule } from '@angular/common/http';
import { StarredComponent } from './components/starred/starred.component';

export const app = initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    EmailVerificationComponent,
    ProfileComponent,
    PostFeedComponent,
    CreatePostComponent,
    PostComponent,
    ReplyComponent,
    FavoriteIconComponent,
    SaveIconComponent,
    ProfileDetailsComponent,
    UserProfileComponent,
    RxjsComponent,
    StarredComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    // Initialize Firebase
  }
}
