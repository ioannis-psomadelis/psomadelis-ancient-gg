import { Routes } from '@angular/router';
import { CreatePostComponent } from '@features/blog/pages/create-post/create-post.component';

export const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () =>
      import('./features/blog/blog.routes').then((m) => m.blogRoutes),
  },
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
];
