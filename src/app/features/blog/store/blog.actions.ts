import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Paginate, Post } from '@features/blog/models';

export const BlogActions = createActionGroup({
  source: 'Blog',
  events: {
    'Load Posts': props<{ paginate: Paginate }>(),
    'Load Posts Success': props<{ posts: Post[]; totalCount: number }>(),
    'Load Posts Failure': props<{ error: string }>(),

    'Load Post': props<{ id: string }>(),
    'Load Post Success': props<{ post: Post }>(),
    'Load Post Failure': props<{ error: string }>(),

    'Clear Selected Post': emptyProps(),
    'Clear Selected Post Success': emptyProps(),

    'Create Post': props<{ post: Post }>(),
    'Create Post Success': props<{ post: Post }>(),
    'Create Post Failure': props<{ error: string }>(),

    'Save Current Page': props<{ page: number }>(),

    'Set Post Created': emptyProps(),
    'Reset Post Created': emptyProps(),
  },
});
