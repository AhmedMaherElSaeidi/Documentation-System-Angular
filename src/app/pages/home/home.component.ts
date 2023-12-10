import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  home_wallpaper: string =
    '../../assets/images/home-wocintechchat-com-tYVkjjMYFBo-canva.jpg';
  profile_wallpaper: string =
    '../../assets/images/profile-wocintechchat-com-tYVkjjMYFBo-canva.jpg';
  contact_wallpaper: string =
    '../../assets/images/contact-wocintechchat-com-tYVkjjMYFBo-canva.jpg';
  quote_wallpaper: string =
    '../../assets/images/quote-wocintechchat-com-tYVkjjMYFBo-canva.jpg';
  services_wallpaper: string =
    '../../assets/images/services-wocintechchat-com-tYVkjjMYFBo-canva.jpg';

  ngOnInit(): void {}
}
