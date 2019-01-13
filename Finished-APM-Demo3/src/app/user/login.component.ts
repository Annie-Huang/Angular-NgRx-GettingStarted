import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromUser from './state/user.reducer';
import * as userActions from './state/user.actions';
import {takeWhile} from "rxjs/operators";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private store: Store<fromUser.State>,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    // this.store.pipe(select('users')).subscribe(
    //   users => {
    //     // Need to make sure products slice from state exists first.
    //     if (users) {
    //       this.maskUserName = users.maskUserName;
    //     }
    //   });
/*
    this.store.pipe(select(fromUser.getMaskUserName)).subscribe(
      maskUserName => this.maskUserName = maskUserName
    );
*/
    // Done: Unsubscribe
    this.store.pipe(select(fromUser.getMaskUserName), takeWhile(() => this.componentActive)).subscribe(
      maskUserName => this.maskUserName = maskUserName
    );
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    // this.maskUserName = value;
/*    this.store.dispatch({
      type: 'MASK_USER_NAME',
      payload: value
    });*/
    this.store.dispatch(new userActions.MaskUserName(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
