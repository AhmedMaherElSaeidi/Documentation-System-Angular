import { Apollo } from 'apollo-angular';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisPhase } from 'src/Models/AnalysisPhase';
import { IntiationPhase } from 'src/Models/InitiationPhase';
import { GetAnalysisPhase, GetInitPhase } from 'src/Services/query.service';

@Component({
  selector: 'app-view-phase',
  templateUrl: './view-phase.component.html',
  styleUrls: ['./view-phase.component.css'],
})
export class ViewPhaseComponent {
  _type: string;
  _init_phase: IntiationPhase;
  _analysis_phase: AnalysisPhase;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const type = (this._type = params['type']);
      const id = params['id'];

      const _query =
        type == 'init-phase'
          ? GetInitPhase
          : type == 'analysis-phase'
          ? GetAnalysisPhase
          : null;

      this.apollo
        .query<any>({
          query: _query,
          variables: {
            id: id,
          },
        })
        .subscribe(({ data }) => {
          if (type == 'init-phase') this._init_phase = data.getInitPhase;
          if (type == 'analysis-phase')
            this._analysis_phase = data.getAnalysisPhase;

            console.log(this._init_phase);
            
        });
    });
  }

  isEqual(firstParam: string, secondParam: string) {
    return firstParam == secondParam;
  }

  return_back() {
    this.router.navigate(['sdlc']);
  }
}
