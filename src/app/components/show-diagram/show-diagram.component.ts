import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetDesignPhase } from 'src/Services/query.service';

@Component({
  selector: 'app-show-diagram',
  templateUrl: './show-diagram.component.html',
  styleUrls: ['./show-diagram.component.css'],
})
export class ShowDiagramComponent {
  imageUrl?: string;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const _id = params['id'];

      this.apollo
        .query<any>({
          query: GetDesignPhase,
          variables: {
            id: _id,
          },
        })
        .subscribe(({ data }) => {
          this.imageUrl = data.getDesignPhase.image;
          console.log(this.imageUrl);
          
        });
    });
  }

  close() {
    this.router.navigate(['all-files']);
  }
}
