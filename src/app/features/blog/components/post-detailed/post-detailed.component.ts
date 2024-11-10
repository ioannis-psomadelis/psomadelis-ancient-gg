import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

// Components
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

// Models
import { Post } from '../../models';

// Facade
import { BlogFacade } from '../../store/blog.facade';

@Component({
  selector: 'app-post-detailed',
  standalone: true,
  imports: [RouterLink, UiButtonComponent],
  providers: [BlogFacade],
  templateUrl: './post-detailed.component.html',
  styleUrls: ['./post-detailed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailedComponent {
  readonly post = input.required<Post>();
}
