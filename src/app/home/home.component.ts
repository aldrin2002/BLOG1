import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  showAddPost: boolean = false; // Define the property

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Initialization code, if needed
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
    this.dialog.open(AddPostComponent).afterClosed().subscribe(() => {
      // Optionally refresh or perform other actions after the dialog is closed
    });
  }
}
