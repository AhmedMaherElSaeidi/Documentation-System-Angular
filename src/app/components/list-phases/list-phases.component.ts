import { Apollo } from 'apollo-angular';
import {
  GetAllInitPhases,
  GetAllAnalysisPhases,
} from 'src/Services/query.service';

import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-phases',
  templateUrl: './list-phases.component.html',
  styleUrls: ['./list-phases.component.css'],
})
export class ListPhasesComponent {
  phases: any = [];
  ascending: boolean = false;

  constructor(private router: Router, private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: GetAllInitPhases,
      })
      .valueChanges.subscribe(({ data }) => {
        const _init_phases = data.getAllInitPhases;
        this.apollo
          .watchQuery<any>({
            query: GetAllAnalysisPhases,
          })
          .valueChanges.subscribe(({ data }) => {
            this.phases = [..._init_phases, ...data.getAllAnalysisPhases];
          });
      });
  }

  getAllPhases(): void {
    this.apollo
      .watchQuery<any>({
        query: GetAllInitPhases,
      })
      .valueChanges.subscribe(({ data }) => {
        const _init_phases = data.getAllInitPhases;
        this.apollo
          .watchQuery<any>({
            query: GetAllAnalysisPhases,
          })
          .valueChanges.subscribe(({ data }) => {
            this.phases = [..._init_phases, ...data.getAllAnalysisPhases];
          });
      });
  }

  reverseArray(): void {
    this.phases.reverse();
  }

  editPhase(id: number, type: string) {
    if (type == 'init-phase') this.router.navigate(['sdlc', 'init-phase', id]);
    if (type == 'analysis-phase')
      this.router.navigate(['sdlc', 'analysis-phase', id]);
  }

  viewPhase(id: number, type: string) {
    this.router.navigate(['sdlc', 'view-phase', type, id]);
  }

  isEqual(first_param: string, second_param: string) {
    return first_param == second_param;
  }
}
