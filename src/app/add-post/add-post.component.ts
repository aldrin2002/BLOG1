import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service'; // Adjust path as needed
import { AuthService } from '../auth.service'; // Adjust path as needed

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  postTitle: string = '';
  postContent: string = ''; // Use string for raw HTML content
  postStatus: string = 'published';
  postCreator: string = ''; // Added field for creator
  imageUrl: string = ''; // Field for image URL
  imagePreviewUrl: string = ''; // Field for image preview URL
  imageSelected: boolean = false; // Flag to check if an image has been selected
  showModal: boolean = true; // Flag to control modal visibility

  constructor(
    private ds: DataService,
    private snackbar: MatSnackBar,
    private authService: AuthService // Inject AuthService
  ) {}

  onSubmit() {
    // Get the user ID from AuthService
    const userId = this.authService.getUserId();

    if (!userId) {
      this.snackbar.open('User is not logged in. Please log in and try again.', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Create post object
    const addpost = {
      title: this.postTitle,
      content: this.postContent,
      status: this.postStatus,
      creator: this.postCreator,
      filepath: this.imageUrl,
      user_id: userId // Use the user ID from AuthService
    };

    // Send post request to backend
    this.ds.createPost(addpost).subscribe(
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
}
