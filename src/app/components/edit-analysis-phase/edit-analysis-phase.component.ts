import { Apollo } from 'apollo-angular';
import { Component } from '@angular/core';
import { AnalysisPhase } from 'src/Models/AnalysisPhase';
import { Router, ActivatedRoute } from '@angular/router';
import { GetAnalysisPhase } from 'src/Services/query.service';
import {
  DeleteAnalysisPhase,
  UpdateAnalysisPhase,
} from 'src/Services/mutation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-analysis-phase',
  templateUrl: './edit-analysis-phase.component.html',
  styleUrls: ['./edit-analysis-phase.component.css'],
})
export class EditAnalysisPhaseComponent {
  phaseID!: string;
  projectForm!: FormGroup;
  submitted: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.phaseID = params['id'];

      this.projectForm = this.fb.group({
        introduction: ['', [Validators.required]],
        purpose: ['', [Validators.required]],
        audience: ['', [Validators.required]],
        sw_description: ['', [Validators.required]],
        sys_fr: ['', [Validators.required]],
      });

      this.apollo
        .query<any>({
          query: GetAnalysisPhase,
          variables: {
            id: this.phaseID,
          },
        })
        .subscribe(({ data }) => {
          this.updateComponent(data.getAnalysisPhase);
        });
    });
  }

  updateComponent(initPhase: AnalysisPhase) {
    this.projectForm.patchValue({
      introduction: initPhase.introduction,
      purpose: initPhase.purpose,
      audience: initPhase.audience,
      sw_description: initPhase.sw_description,
      sys_fr: initPhase.sys_fr,
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.projectForm.valid) {
      this.apollo
        .mutate<any>({
          mutation: UpdateAnalysisPhase,
          variables: {
            analysisPhase: {
              ...this.projectForm.value,
            },
            id: this.phaseID,
          },
        })
        .subscribe(
          // @ts-ignore
          ({ data }) => {
            // Handle success here
            alert(
              'Updated Successfully with id of ' + data.updateAnalysisPhase.id
            );
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

  getError(controlName: string) {
    const control = this.projectForm.get(controlName);
    return control?.hasError('required') && this.submitted
      ? '*This field is required'
      : '';
  }

  delete_phase(id: string): void {
    this.apollo
      .mutate<any>({
        mutation: DeleteAnalysisPhase,
        variables: {
          id: id,
        },
      })
      .subscribe();

    alert('Removed Successfully');
    this.router.navigate(['home']);
  }
}
