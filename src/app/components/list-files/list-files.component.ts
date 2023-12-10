import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GetAllDesignPhases } from 'src/Services/query.service';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css'],
})
export class ListFilesComponent implements OnInit {
  files: any = [];
  ascending: boolean = false;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: GetAllDesignPhases,
      })
      .valueChanges.subscribe(({ data }) => {
        this.files = data.getAllDesignPhases;
      });
  }

  getAllFiles(): void {
    this.apollo
    .watchQuery<any>({
      query: GetAllDesignPhases,
    })
    .valueChanges.subscribe(({ data }) => {
      this.files = data.getAllDesignPhases;
    });
  }

  selectedCard(id: number) {
    this.router.navigate(['all-files', 'show-diagram', id]);
  }
}
