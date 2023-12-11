import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  GetAllAnalysisPhases,
  GetAllDesignPhases,
} from 'src/Services/query.service';
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
        const _design_files = data.getAllDesignPhases;
        this.apollo
          .watchQuery<any>({
            query: GetAllAnalysisPhases,
          })
          .valueChanges.subscribe(({ data }) => {
            this.files = [..._design_files, ...data.getAllAnalysisPhases];
          });
      });
  }

  getAllFiles(): void {
    this.apollo
      .watchQuery<any>({
        query: GetAllDesignPhases,
      })
      .valueChanges.subscribe(({ data }) => {
        this.files = data.getAllDesignPhases;
        const _design_files = data.getAllDesignPhases;
        this.apollo
          .watchQuery<any>({
            query: GetAllAnalysisPhases,
          })
          .valueChanges.subscribe(({ data }) => {
            this.files = [..._design_files, ...data.getAllAnalysisPhases];
          });
      });
  }

  selectedCard(id: number, type: string) {
    this.router.navigate(['all-files', 'show-diagram', type, id]);
  }

  isEqual(first_param: string, second_param: string) {
    return first_param == second_param;
  }
}
