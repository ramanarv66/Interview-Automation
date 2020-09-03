import {Component, OnInit, ViewChild} from '@angular/core';
import {Register} from "../model/register";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm', { static: false }) formValues;
  register: Register = new Register();
  showPassWordWarn: boolean;
  showSuccessMsg: boolean;
  showSpinner: boolean = false;
  registerForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }
  signIn(): void {
    console.log(this.register)
    this.showSpinner = true;

    if (this.register.password != this.register.confirmpassword) {
      this.showPassWordWarn = true;
    } else {
      this.showPassWordWarn = false;
      console.log(this.register)
      this.http.registerCustomer(this.register).subscribe((resp: string) => {
        if (resp) {
          console.log("Response finally Got " + resp)
          this.showSuccessMsg = true;
        }

      }, () => {
        this.showSuccessMsg = true;
        this.showSpinner = false;
      });
    }

  }
  reset(): void {
    this.formValues.reset();
  }
  validatePassword(): void {
    if (this.register.password != this.register.confirmpassword) {
      this.showPassWordWarn = true;
    } else {
      this.showPassWordWarn = false;
    }
  }
  cancel(): void {
    this.formValues.reset();
    this.showSuccessMsg = false;
  }
}
