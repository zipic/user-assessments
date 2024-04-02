import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  role: string = '';
  email!: string;
  password: string = '';
  loginForm!: FormGroup;

  constructor(private apiService: ApiService, private router: Router) {
    this.createForm();
  }

  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit() {
    this.email = this.loginForm.get('email')?.value;
    this.password = this.loginForm.get('password')?.value;

    this.apiService.login(this.email, this.password).subscribe((res: Login) => {
      const token = res.token;
      this.role = res.role;
      this.apiService.setRole(res.role);
      console.log(token, res);

      localStorage.setItem('token', token);

      if (this.role === 'Admin') {
        this.router.navigate(['/admin']);
      } else if (this.role === 'User') {
        this.router.navigate(['/user']);
      } else {
        this.router.navigate(['/']);
      }
    })
  }
}
