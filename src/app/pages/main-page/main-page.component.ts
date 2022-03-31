import { Component, OnInit } from '@angular/core';
import {MainPageDTO} from "../../@core/dtos/MainPageDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainPageService} from "../../@core/services/main-page.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  form!: FormGroup;
  editing: boolean = false;
  mainPage: MainPageDTO = new MainPageDTO();

  constructor(
    private formBuilder: FormBuilder,
    private mainPageService: MainPageService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(data?: MainPageDTO): void {
    this.form = this.formBuilder.group({
      name: [[data && data.name ? data.name : ''], [Validators.required, Validators.maxLength(20)]],
      surname: [[data && data.surname ? data.surname : ''], [Validators.required, Validators.minLength(5)]],
      age: [[data && data.age ? data.age : 0], [Validators.required]]
    })
  }

  mockMethod(): void {
    this.form?.get('name')
  }

  toggleEditing(): boolean {
    this.editing = !this.editing
    return this.editing;
  }

  save(): void{
    this.editing = false;
    this.mainPage.name = this.form.get('name')?.value;
    this.mainPage.surname = this.form.get('surname')?.value;
    this.mainPage.age = this.form.get('age')?.value;

  }

  cancel(): void{
    this.editing = false;
    this.form.get('name')?.setValue(this.mainPage.name);
    this.form.get('surname')?.setValue(this.mainPage.surname);
    this.form.get('age')?.setValue(this.mainPage.age);
  }
}

