import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup<any> = new FormGroup({ name: new FormControl('') });

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('LOGIN COMP')
    this.myForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    this.router.navigate(['/report'])
  }

}
