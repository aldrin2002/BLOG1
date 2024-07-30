import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service'; // Adjust path as needed
import { AuthService } from '../auth.service'; // Adjust path as needed
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Define the Post interface
interface Post {
  title: string;
  content: string;
  status: string;
  creator: string;
  filepath: string;
  user_id: string;
  post_id?: number; // Optional post_id for update
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @Output() postCreated = new EventEmitter<void>(); // Event emitter for post creation

  postTitle: string = '';
  postContent: string = ''; // Use string for raw HTML content
  postStatus: string = 'published';
  postCreator: string = ''; // Added field for creator
  imageUrl: string = ''; // Field for image URL
  imagePreviewUrl: string = ''; // Field for image preview URL
  imageSelected: boolean = false; // Flag to check if an image has been selected
  showModal: boolean = true; // Flag to control modal visibility
  isEditMode: boolean = false; // Flag to check if it's edit mode
  postId: number | null = null; // Store the post ID for edit

  constructor(
    private ds: DataService,
    private snackbar: MatSnackBar,
    private authService: AuthService, // Inject AuthService
    private dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.post) {
      this.isEditMode = true;
      this.postId = data.post.post_id;
      this.postTitle = data.post.title;
      this.postContent = data.post.content;
      this.postStatus = data.post.status;
      this.postCreator = data.post.creator;
      this.imageUrl = data.post.filepath;
    }
  }

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
    const post: Post = {
      title: this.postTitle,
      content: this.postContent,
      status: this.postStatus,
      creator: this.postCreator,
      filepath: this.imageUrl,
      user_id: userId // Use the user ID from AuthService
    };

    if (this.isEditMode && this.postId !== null) {
      // If in edit mode, add post_id to the post object
      post.post_id = this.postId;
      this.ds.updatePost(post).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.snackbar.open('Post updated successfully!', 'Close', {
              duration: 3000,
            });
            this.dialogRef.close('updated'); // Close dialog and send updated event
          } else {
            this.snackbar.open('Failed to update post. Please try again.', 'Close', {
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
    } else {
      // If not in edit mode, call createPost
      this.ds.createPost(post).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.snackbar.open('Post created successfully!', 'Close', {
              duration: 3000,
            });
            this.postCreated.emit(); // Emit event on success
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
  }

  closeEditor() {
    this.showModal = false;
    this.dialogRef.close();
  }
}
