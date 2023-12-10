import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css'],
})
export class ListFilesComponent implements OnInit {
  files: any = [];
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.files = [];
  }

  selectedCard(id: number) {
    this.router.navigate(['all-files', 'show-diagram', id]);
  }
}
