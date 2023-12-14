import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CreateDesignPhase, UPLOAD_FILE } from 'src/Services/mutation.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-design-phase',
  templateUrl: './create-design-phase.component.html',
  styleUrls: ['./create-design-phase.component.css'],
})
export class CreateDesignPhaseComponent {
  _file: File[] = [];
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
    const files = this.fileUploadForm.value.files;

    if (this.fileUploadForm.valid) {
      files.forEach((file, index) => {
        this.apollo
          .mutate<any>({
            mutation: UPLOAD_FILE,
            variables: {
              file: this._file[index],
            },
            context: {
              useMultipart: true,
            },
          })
          .subscribe(
            ({ data }: any) => {
              const _image_path = data.uploadFile.url;

              this.apollo
                .mutate<any>({
                  mutation: CreateDesignPhase,
                  variables: {
                    designPhase: {
                      filename: file.fileName,
                      image: _image_path,
                    },
                  },
                })
                .subscribe(
                  // @ts-ignore
                  ({ data }) => {
                    // Handle success here
                    // console.log(data);
                  },
                  // @ts-ignore
                  (error) => {
                    // Handle error here
                    console.error('Mutation error', error);

                    // Log additional details from the error response
                    if (error.graphQLErrors) {
                      // @ts-ignore
                      error.graphQLErrors.forEach((graphQLError) => {
                        console.error('GraphQL Error:', graphQLError);
                      });
                    }

                    if (error.networkError) {
                      console.error('Network Error:', error.networkError);
                    }
                  }
                );
            },
            (error) => {
              console.log(error);
            }
          );
      });

      alert('files were added successfully');
      this.router.navigate(['home']);
    }
  }

  onFileChange(event: any) {
    const _file = event.target.files[0];
    this._file.push(_file);
  }

  get filesFormArray() {
    return this.fileUploadForm.get('files') as FormArray;
  }

  createFileGroup() {
    const fileFormGroup = this.fb.group({
      fileName: ['', [Validators.required]],
      fileImage: ['', [Validators.required]],
    });

    this.submitted = false;
    this.filesFormArray.push(fileFormGroup);
  }

  removeFile(index: number) {
    if (index != 0) {
      this._file.splice(index, 1);
      this.filesFormArray.removeAt(index);
    }
  }

  getError(controlName: string, index: number) {
    const control = this.filesFormArray.at(index).get(controlName);
    return control?.hasError('required') && this.submitted
      ? `${controlName} *This field is required`
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
