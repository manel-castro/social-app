import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { ProfileComponent } from './tools/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { StarredComponent } from './components/starred/starred.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'emailVerification',
    component: EmailVerificationComponent,
  },
  {
    path: 'postfeed',
    component: PostFeedComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    children: [
      { path: 'Starred', component: StarredComponent },
      { path: ':name', component: ProfileDetailsComponent },
    ],
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
