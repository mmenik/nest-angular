import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private readonly router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    const values = form.value;
    const payload = {
      username: values.username,
      password: values.password
    };

    this.apiService.post('auth', payload)
      .subscribe(
        (data: any) => {
          this.authService.setToken(data.token);
          this.router.navigate(['/contacts']);
        },
        error => {
          console.error('error', error);
        });
  }
}
