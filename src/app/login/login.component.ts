import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  passwordFieldType: string = 'password'; // Default password field type

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  onSubmit() {
    this.dataService.userLogin(this.user).subscribe(
      (response) => {
        if (response.status === 'success') {
          // Assuming response contains user data inside user key
          const userId = response.user.user_id;
          this.authService.setUserId(userId);

          // Show success message
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000, // Duration in milliseconds
            verticalPosition: 'top', // Positioning on the screen
          });

          this.router.navigate(['/home']);
        } else {
          // Show error message if login fails
          this.snackBar.open('Login failed. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      },
      (error) => {
        console.error('Error:', error);
        // Show error message
        this.snackBar.open('An error occurred. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
