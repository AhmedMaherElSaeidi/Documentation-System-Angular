import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CreateDesignPhase } from 'src/Services/mutation.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-design-phase',
  templateUrl: './create-design-phase.component.html',
  styleUrls: ['./create-design-phase.component.css'],
})
export class CreateDesignPhaseComponent {
  submitted: Boolean = false;
  fileUploadForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.fileUploadForm = this.fb.group({
      files: this.fb.array([], [Validators.required]),
    });

    this.createFileGroup();
  }

  onSubmit() {
    this.submitted = true;
    for (let index = 0; index < this.filesFormArray.length; index++) {
      // console.log(this.getError('fileImage', index));
      console.log(
        'has error',
        this.filesFormArray.at(index).get('fileName')?.hasError('required')
      );
    }
    // Access the form value, which now contains an array of files
    const files = this.fileUploadForm.value.files;
    console.log(files);
    console.log(this.fileUploadForm.valid);

    // You can handle the files as needed (e.g., send them to a server, process them, etc.)
  }

  get filesFormArray() {
    return this.fileUploadForm.get('files') as FormArray;
  }

  createFileGroup() {
    const fileFormGroup = this.fb.group({
      fileName: ['', [Validators.required]],
      fileImage: ['', [Validators.required]],
    });

    this.filesFormArray.push(fileFormGroup);
  }

  removeFile(index: number) {
    if (index == 0) return;
    this.filesFormArray.removeAt(index);
  }

  getError(controlName: string, index: number) {
    const control = this.filesFormArray.at(index).get(controlName);
    return control?.hasError('required') && this.submitted
      ? '*This field is required'
      : '';
  }

  resetForm(display_msg: boolean = true) {
    this.submitted = false;
    this.filesFormArray.clear();
    this.createFileGroup();
    
    this.fileUploadForm.reset();
    if (display_msg) alert('Form Reset Successfully');
  }
}
