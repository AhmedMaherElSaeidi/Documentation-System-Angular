import { Apollo } from 'apollo-angular';
import { GetInitPhase } from 'src/Services/query.service';
import { IntiationPhase } from 'src/Models/InitiationPhase';
import {
  UpdateInitPhase,
  DeleteInitPhase,
} from 'src/Services/mutation.service';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-init-phase',
  templateUrl: './edit-init-phase.component.html',
  styleUrls: ['./edit-init-phase.component.css'],
})
export class EditInitPhaseComponent {
  phaseID!: string;
  projectForm!: FormGroup;
  submitted: Boolean = false;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.phaseID = params['id'];

      this.projectForm = this.fb.group({
        title: ['', [Validators.required]],
        manager: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        finishDate: ['', [Validators.required]],
        objectives: ['', [Validators.required]],
        budgetInfo: ['', [Validators.required]],
        scopeStatements: ['', [Validators.required]],
      });

      this.apollo
        .query<any>({
          query: GetInitPhase,
          variables: {
            id: this.phaseID,
          },
        })
        .subscribe(({ data }) => {
          this.updateComponent(data.getInitPhase);
        });
    });
  }

  updateComponent(initPhase: IntiationPhase) {
    this.projectForm.patchValue({
      title: initPhase.title,
      manager: initPhase.manager,
      startDate: initPhase.startDate,
      finishDate: initPhase.finishDate,
      objectives: initPhase.objectives,
      budgetInfo: initPhase.budgetInfo,
      scopeStatements: initPhase.scopeStatements,
    });
  }

  onSubmit() {
    this.submitted = true;
    const validDate = this.startDateBeforeEndDateValidator();

    if (this.projectForm.valid && !validDate) {
      this.apollo
        .mutate<any>({
          mutation: UpdateInitPhase,
          variables: {
            initPhase: {
              ...this.projectForm.value,
            },
            id: this.phaseID,
          },
        })
        // @ts-ignore
        .subscribe(({ data }) => {
          this.updateComponent(data.updateInitPhase);
        });

      alert('Updated Successfully');
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

  delete_phase(id: string): void {
    this.apollo
      .mutate<any>({
        mutation: DeleteInitPhase,
        variables: {
          id: id,
        },
      })
      .subscribe();

    alert('Removed Successfully');
    this.router.navigate(['home']);
  }

  getError(controlName: string) {
    const control = this.projectForm.get(controlName);
    return control?.hasError('required') && this.submitted
      ? '*This field is required'
      : '';
  }

  close() {
    this.router.navigate(['sdlc']);
  }
}
