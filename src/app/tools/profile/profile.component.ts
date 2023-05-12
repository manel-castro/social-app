import { Component, Input } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { app } from 'src/app/app.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @Input() show: boolean;

  db = getFirestore(app);
  auth = getAuth(app);

  onContinueClick(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLTextAreaElement
  ) {
    const name = nameInput.value;
    const description = descriptionInput.value;

    setDoc(doc(this.db, 'Users', this.auth.currentUser!.uid), {
      publicName: name,
      description: description,
    })
      .then((docId) => {
        alert('Profile created');
        nameInput.value = '';
        descriptionInput.value = '';
      })
      .catch((err) => {});
  }
}
