import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  openEmail() {
    window.location.href ='https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCHrglkFTSpcwcQvDJhthzRQrrTzgpPHQWcjHNZbwKqMwNlZxBqVbqBfGgLnQbvpksKrhGCg';
  }
}
