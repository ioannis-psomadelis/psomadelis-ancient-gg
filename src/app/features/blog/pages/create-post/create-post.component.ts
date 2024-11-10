import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Components
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

// Facades
import { BlogFacade } from '@features/blog/store/blog.facade';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButtonComponent],
  providers: [BlogFacade],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  private readonly blogFacade = inject(BlogFacade);
  private readonly fb = inject(FormBuilder);

  protected readonly loading$ = this.blogFacade.loading$;
  protected readonly error$ = this.blogFacade.error$;

  protected form!: FormGroup;

  // Form getters
  protected get title() {
    return this.form.get('title');
  }
  protected get body() {
    return this.form.get('body');
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected createPost(): void {
    if (this.form.valid) {
      this.blogFacade.createPost({
        title: this.title?.value,
        body: this.body?.value,
      });
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }
}
