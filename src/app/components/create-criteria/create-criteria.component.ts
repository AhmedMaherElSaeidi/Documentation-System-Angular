import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-criteria',
  templateUrl: './create-criteria.component.html',
  styleUrls: ['./create-criteria.component.css'],
})
export class CreateCriteriaComponent {
  selectedOption: string = '';
  isDropdownVisible: boolean = false;

  criteriaOptions = [
    { route: '', name: 'Select Your desired Phase'},
    { route: 'init-phase', name: 'Initiation Phase' },
    { route: 'analysis-phase', name: 'Requirements Phase (Analysis Phase)' },
    { route: 'design-phase', name: 'Design Phase' },
  ];

  constructor(private router: Router) {}

  selectOption(option: string) {
    if (option == '') this.router.navigate(['sdlc']);
    option ? this.router.navigate(['sdlc', option]) : '';
  }

  isSelected(option:string, selected:string=''): boolean {    
    return option == selected;
  }
}
