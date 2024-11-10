import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/post-list/post-list.component').then(
        (c) => c.PostListComponent,
      ),
  },
  {
    path: 'create-post',
    loadComponent: () =>
      import('./pages/create-post/create-post.component').then(
        (c) => c.CreatePostComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/post/post.component').then((c) => c.PostComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
