import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  selectedImageFile: File;

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
