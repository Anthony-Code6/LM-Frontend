import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-links',
  imports: [RouterLink],
  templateUrl: './button-links.component.html',
  styleUrl: './button-links.component.scss'
})
export class ButtonLinksComponent {
  link = input<string>()
}
