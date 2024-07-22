import { Component } from '@angular/core';
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
export class HomeComponent {
  selectedSection: string = 'home'; // Default section
  showAddPost: boolean = false;

  constructor(
    private router: Router,
    private ds: DataserviceService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialog
  ) { }

  selectSection(section: string) {
    this.selectedSection = section;
  }

  logout() {
    // Clear session data or tokens here if needed
    // this.ds.clearUserSession(); // Implement this method in your DataService

    // Optionally show a notification
    this.snackbar.open('You have been logged out.', 'Close', {
      duration: 3000,
    });

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
  /*toggleAddContent(): void {
    this.showAddPost = !this.showAddPost;
  }*/
  openDialog(){
    this.dialogRef.open(AddPostComponent);
  }
  
  
}
