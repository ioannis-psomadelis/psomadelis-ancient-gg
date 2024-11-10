import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Shared
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, UiButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly title = 'GraphQL Blog Posts';
}
