import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css'],
})
export class MyPostComponent implements OnInit {
  selectedSection: string = 'home'; // Default section
  showAddPost: boolean = false; // Define the property
  posts: any[] = [];
  userId: number | null = null; // Define userId as a number

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.authService.getUserId());
    console.log('User ID:', this.userId); // Log user ID
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.dataService.getPosts().subscribe(response => {
      console.log('Server response:', response); // Log server response
      if (response.status === 'success') {
        console.log('First post object:', response.data[0]); // Log the first post object

        if (this.userId) {
          this.posts = response.data.filter((post: any) => {
            const postUserId = Number(post.user_id);
            console.log('Post user_id:', postUserId); // Log user_id of each post
            return postUserId === this.userId;
          });
          if (this.posts.length === 0) {
            console.log('No posts found for the current user.');
            this.snackbar.open('No posts found for the current user.', 'Close', {
              duration: 3000,
            });
          } else {
            console.log('Filtered posts:', this.posts); // Log filtered posts
          }
        } else {
          this.snackbar.open('User ID is not available.', 'Close', {
            duration: 3000,
          });
        }
      } else {
        this.snackbar.open('Failed to load posts.', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  logout(): void {
    // Clear session data or tokens here if needed
    // Uncomment and ensure logout method exists in DataserviceService
    // this.dataService.logout();

    // Show a notification
    this.snackbar.open('You have been logged out.', 'Close', {
      duration: 3000,
    });

    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPostComponent);
    dialogRef.componentInstance.postCreated.subscribe(() => {
      this.fetchPosts();
    });
  }

  sortPosts(order: 'asc' | 'desc') {
    if (order === 'asc') {
      this.posts.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else {
      this.posts.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  }

  editPost(post: any): void {
    // Open dialog for editing the post
    const dialogRef = this.dialog.open(AddPostComponent, {
      data: { post: post },
    });

    // Subscribe to the dialog's afterClosed observable
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        // Fetch posts again to reflect the changes
        this.fetchPosts();
      }
    });
  }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.dataService.deletePost(postId).subscribe((response) => {
        if (response.status === 'success') {
          this.snackbar.open('Post deleted successfully.', 'Close', {
            duration: 3000,
          });
          this.fetchPosts(); // Refresh the posts list
        } else {
          this.snackbar.open('Failed to delete post.', 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }
}
