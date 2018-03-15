import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  title = 'errato';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('menu init');
    this.authService.title().subscribe(
      data => {
        console.log(data);
        this.title = data.title;
      },
      err => {
        console.log(err);
      }
    );
  }

}
