import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-show-diagram',
  templateUrl: './show-diagram.component.html',
  styleUrls: ['./show-diagram.component.css'],
})
export class ShowDiagramComponent {
  imageUrl?:string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.imageUrl = '../../assets/images/christina-wocintechchat-com-tYVkjjMYFBo-unsplash.jpg';
    this.route.params.subscribe((params) => {
      this.updateComponent(+params['id']);
    });
  }

  updateComponent(id: number) {
    console.log(id);
    
  }

  close() {
    this.router.navigate(['all-files']);
  }
}
