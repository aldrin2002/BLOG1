import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedSection: string = 'home'; // Default section
  showAddPost: boolean = false; // Define the property
  posts: any[] = [];
  allPosts: any[] = []; // Add this to keep a copy of all posts

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.dataService.getPosts().subscribe(response => {
      if (response.status === 'success') {
        this.posts = response.data;
        this.allPosts = response.data; // Store all posts for filtering
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
    // this.ds.logout(); 

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
      this.posts.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else {
      this.posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  }

  onSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      // If search term is empty, reset the posts to all posts
      this.posts = this.allPosts;
    } else {
      // Filter posts based on the search term
      this.posts = this.allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.created_by.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
