import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import { PostsActions, PostsApiActions } from '../actions/posts.actions';
import { Post } from 'src/app/models/posts.model';

@Injectable()
export class PostsEffects {

    constructor(
        private actions$: Actions,
        private postsService: PostsService
    ) { }

    loadPosts$ = createEffect(() => this.actions$.pipe(
        ofType('[Posts] Load Posts'),
        mergeMap(() => this.postsService.getPosts()
            .pipe(
                map(posts => PostsApiActions.retrievedPostsList({ posts })),
                catchError(() => EMPTY)
            ))
    )
    );

    addPost$ = createEffect(() => this.actions$.pipe(
        ofType('[Posts] Add Post'),
        mergeMap((action) => this.postsService.addPost(action)
            .pipe(
                map(res => {
                    return PostsActions.loadPosts()
                }),
                catchError(() => EMPTY)
            ))
    ))

    editPost$ = createEffect(() => this.actions$.pipe(
        ofType('[Posts] Edit Post'),
        mergeMap((action: Post) => this.postsService.editPost(action)
            .pipe(
                map(res => {
                    return PostsActions.loadPosts()
                }),
                catchError(() => EMPTY)
            ))
    ))

    removePost$ = createEffect(() => this.actions$.pipe(
        ofType('[Posts API] Remove Post'),
        mergeMap((action: any) => this.postsService.removePost(action.id)
            .pipe(
                map(res => {
                    return PostsApiActions.removedPostSuccess({ id: action.id })
                }),
                catchError(() => EMPTY)
            ))
    ))
}   