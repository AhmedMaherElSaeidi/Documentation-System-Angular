import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetAnalysisPhase, GetDesignPhase } from 'src/Services/query.service';
import {
  DeleteAnalysisPhase,
  DeleteDesignPhase,
} from 'src/Services/mutation.service';

@Component({
  selector: 'app-show-diagram',
  templateUrl: './show-diagram.component.html',
  styleUrls: ['./show-diagram.component.css'],
})
export class ShowDiagramComponent {
  _id?: string;
  _type?: string;
  imageUrl?: string;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this._id = params['id'];
      this._type = params['type'];

      const _query =
        this._type == 'design-phase'
          ? GetDesignPhase
          : this._type == 'analysis-phase'
          ? GetAnalysisPhase
          : null;

      this.apollo
        .query<any>({
          query: _query,
          variables: {
            id: this._id,
          },
        })
        .subscribe(({ data }) => {
          if (this._type == 'design-phase')
            this.imageUrl = data.getDesignPhase.image;
          if (this._type == 'analysis-phase')
            this.imageUrl = data.getAnalysisPhase.image;
        });
    });
  }

  delete_image() {
    const _query =
      this._type == 'design-phase'
        ? DeleteDesignPhase
        : this._type == 'analysis-phase'
        ? DeleteAnalysisPhase
        : null;

    this.apollo
      .mutate<any>({
        mutation: _query,
        variables: {
          id: this._id,
        },
      })
      .subscribe();

    alert(`image with id ${this._id} has been removed`)
    this.close();
  }

  close() {
    this.router.navigate(['home']);
  }
}
