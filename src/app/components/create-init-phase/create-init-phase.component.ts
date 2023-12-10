import { Apollo } from 'apollo-angular';
import { CreateInitPhase } from 'src/Services/mutation.service';

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-init-phase',
  templateUrl: './create-init-phase.component.html',
  styleUrls: ['./create-init-phase.component.css'],
})
export class CreateInitPhaseComponent {
  projectForm!: FormGroup;
  submitted: Boolean = false;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      finishDate: ['', [Validators.required]],
      objectives: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      budgetInfo: ['', [Validators.required]],
      scopeStatements: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    const validDate = this.startDateBeforeEndDateValidator();

    if (this.projectForm.valid && !validDate) {
      this.apollo
        .mutate<any>({
          mutation: CreateInitPhase,
          variables: {
            initPhase: {
              ...this.projectForm.value,
            },
          },
        })
        .subscribe(
          // @ts-ignore
          ({ data }) => {
            // Handle success here            
            alert('Created Successfully with id of ' + data.createInitPhase.id);
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

        this.router.navigate(['home']);
    }
  }

  startDateBeforeEndDateValidator(): boolean {
    const startDate = this.projectForm.value.startDate;
    const finishDate = this.projectForm.value.finishDate;

    if (startDate && finishDate && new Date(startDate) > new Date(finishDate)) {
      return true;
    }

    return false;
  }

  getError(controlName: string) {
    const control = this.projectForm.get(controlName);
    return control?.hasError('required') && this.submitted
      ? '*This field is required'
      : '';
  }

  reset() {
    this.submitted = false;
    this.projectForm.reset();
    alert('Form Reset Successfully');
  }

  close() {
    this.router.navigate(['sdlc']);
  }
}
