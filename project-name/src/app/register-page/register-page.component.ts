import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  email: string = '';
  nume: string = '';
  tip_boala: string = '';
  varsta: number | null = null;
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.email && this.nume && this.tip_boala && this.varsta !== null && this.password) {
      const newUser = {
        email: this.email,
        nume: this.nume,
        tip_boala: this.tip_boala,
        varsta: this.varsta,
        password: this.password
      };

      this.userService.createUser(newUser).subscribe(
        () => {
          console.log('Registration successful');
          this.successMessage = 'User registered successfully!';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/welcome']), 2000); // Redirect after 2 seconds
        },
        (error) => {
          this.errorMessage = 'Failed to register user. Email may already be in use.';
          this.successMessage = '';
          console.error('Registration error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill out all fields.';
    }
  }
}
