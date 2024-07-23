import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedSection: string = 'home'; // Default section
  showAddPost: boolean = false;
  posts: any[] = []; // Array to hold posts

  constructor(
    private router: Router,
    private ds: DataserviceService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog // Updated to 'dialog' for clarity
  ) { }

  ngOnInit(): void {
    this.fetchPosts(); // Fetch posts when the component initializes
  }

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  logout(): void {
    // Clear session data or tokens here if needed
    // this.ds.logout(); // Uncomment and ensure logout method exists in DataserviceService

    // Optionally show a notification
    this.snackbar.open('You have been logged out.', 'Close', {
      duration: 3000,
    });

    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  openDialog(): void {
    this.dialog.open(AddPostComponent).afterClosed().subscribe(() => {
      this.fetchPosts(); // Refresh the posts after closing the dialog
    });
  }

  fetchPosts(): void {
    this.ds.getPosts().subscribe(
      (posts: any[]) => {
        this.posts = posts;
      },
      (error: any) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
}
