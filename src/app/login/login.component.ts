import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

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

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.dataService.userLogin(this.user).subscribe(
      (response) => {
        if (response.status === 'success') {
          // Assuming response contains user data inside user key
          const userId = response.user.user_id;
          this.authService.setUserId(userId);

          this.router.navigate(['/home']);
        } else {
         
        }
      },
      (error) => {
        console.error('Error:', error);
        
      }
    );
  }
}
