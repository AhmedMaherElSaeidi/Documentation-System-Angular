import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  CreateAnalysisPhase,
  UPLOAD_FILE,
} from 'src/Services/mutation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-analysis-phase',
  templateUrl: './create-analysis-phase.component.html',
  styleUrls: ['./create-analysis-phase.component.css'],
})
export class CreateAnalysisPhaseComponent {
  _file!: File;
  projectForm!: FormGroup;
  submitted: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit() {
    this.projectForm = this.fb.group({
      introduction: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      audience: ['', [Validators.required]],
      sw_description: ['', [Validators.required]],
      sys_fr: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.projectForm.valid) {
      this.apollo
        .mutate<any>({
          mutation: UPLOAD_FILE,
          variables: {
            file: this._file,
          },
          context: {
            useMultipart: true,
          },
        })
        .subscribe(
          ({ data }: any) => {
            console.log(data.uploadFile.url);

            // this.apollo
            // .mutate<any>({
            //   mutation: CreateAnalysisPhase,
            //   variables: {
            //     analysisPhase: {
            //       ...this.projectForm.value,
            //     },
            //   },
            // })
            // .subscribe(
            //   // @ts-ignore
            //   ({ data }) => {
            //     // Handle success here
            //     alert(
            //       'Created Successfully with id of ' + data.createAnalysisPhase.id
            //     );
            //   },
            //   // @ts-ignore
            //   (error) => {
            //     // Handle error here
            //     console.error('Mutation error', error);

            //     // Log additional details from the error response
            //     if (error.graphQLErrors) {
            //       // @ts-ignore
            //       error.graphQLErrors.forEach((graphQLError) => {
            //         console.error('GraphQL Error:', graphQLError);
            //       });
            //     }

            //     if (error.networkError) {
            //       console.error('Network Error:', error.networkError);
            //     }
            //   }
            // );
          },
          (error) => {
            console.log(error);
          }
        );

      this.resetForm(false);
      // this.router.navigate(['home']);
    }
  }

  onFileChange(event: any) {
    this._file = event.target.files[0];
  }

  getError(controlName: string) {
    const control = this.projectForm.get(controlName);
    return control?.hasError('required') && this.submitted
      ? '*This field is required'
      : '';
  }

  resetForm(display_msg: boolean = true) {
    this.submitted = false;
    this.projectForm.reset();
    if (display_msg) alert('Form Reset Successfully');
  }
}
