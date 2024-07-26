import { Component, ViewChild, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuillEditorComponent } from 'ngx-quill';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @ViewChild('editor') editor!: QuillEditorComponent;

  postTitle: string = '';
  postCreator: string = '';
  postContent: string = ''; // Use string for raw HTML content
  postStatus: string = 'published';
  imageUrl: string = ''; // Field for image URL
  imagePreviewUrl: string = ''; // Field for image preview URL
  imageSelected: boolean = false; // Flag to check if an image has been selected
  showModal: boolean = true; // Flag to control modal visibility

  constructor(
    @Inject(DataService) private ds: DataService, // Use @Inject decorator
    private snackbar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  postContentHandler() {
    // Create post object
    const addPost = {
      title: this.postTitle,
      creator: this.postCreator,
      content: this.postContent,
      status: this.postStatus,
      imageUrl: this.imageUrl,
      userId: this.authService.getUserId() // Assuming userId is stored in AuthService
    };

    // Send post request to backend
    this.ds.createPost(addPost).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.snackbar.open('Post created successfully!', 'Close', {
            duration: 3000,
          });
          this.closeEditor(); // Close modal on success
        } else {
          this.snackbar.open('Failed to create post. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      },
      (error: any) => {
        console.error('Error:', error);
        this.snackbar.open('An error occurred. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  closeEditor() {
    this.showModal = false;
  }

  handleImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
        this.imageSelected = true; // Update flag when image is selected
      };
      reader.readAsDataURL(file);
    }
  }
}
