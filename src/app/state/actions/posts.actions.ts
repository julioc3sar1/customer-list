import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";

export const PostsActions = createActionGroup({
    source: 'Posts',
    events: {
        'Load Posts': emptyProps(),
        'Search Post': props<{ search: string }>(),
        'Sort Posts': props<{ column: string }>(),
    }
})

export const PostsApiActions = createActionGroup({
    source: 'Posts API',
    events: {
        'Retrieved Posts List': props<{ posts: Post[] }>(),
        'Add Post': props<{ post: Post }>(),
        'Add Post Success': props<{ post: Post }>(),
        'Edit Post': props<{ post: Post }>(),
        'Edit Post Success': props<{ post: Post }>(),
        'Remove Post': props<{ id: string }>(),
        'Removed Post Success': props<{ id: string }>(),
    }
})