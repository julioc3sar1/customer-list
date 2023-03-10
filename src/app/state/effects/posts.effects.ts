import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import { PostsActions, PostsApiActions } from '../actions/posts.actions';
import { Post } from 'src/app/models/posts.model';
import { APIResponsesActions } from '../actions/apiResponses.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class PostsEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private postsService: PostsService
    ) { }

    loadPosts$ = createEffect(
        () => this.actions$.pipe(
            ofType('[Posts] Load Posts'),
            mergeMap(() => this.postsService.getPosts()
                .pipe(
                    map(posts => PostsApiActions.retrievedPostsList({ posts })),
                    catchError(() => EMPTY)
                ))
        )
    );

    addPost$ = createEffect(
        () => this.actions$.pipe(
            ofType('[Posts API] Add Post'),
            mergeMap((action) => this.postsService.addPost(action)
                .pipe(
                    map(res => PostsApiActions.addPostSuccess({ post: res }),
                        catchError(() => EMPTY)
                    ))
            )))

    addPostSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType('[Posts API] Add Post Success'),
                tap((action) => {
                    this.store.dispatch(APIResponsesActions.complete({ response: { type: 'success', msg: 'Post guardado con exito' } }))
                })
            ),
        { dispatch: false }
    );

    editPost$ = createEffect(
        () => this.actions$.pipe(
            ofType('[Posts API] Edit Post'),
            mergeMap((action: Post) => this.postsService.editPost(action)
                .pipe(
                    map(res => PostsApiActions.editPostSuccess({ post: res })),
                    catchError(() => EMPTY)
                ))
        )
    )

    editPostSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType('[Posts API] Edit Post Success'),
                tap((action) => {
                    this.store.dispatch(APIResponsesActions.complete({ response: { type: 'success', msg: 'Post editado con exito' } }))
                })
            ),
        { dispatch: false }
    );

    removePost$ = createEffect(
        () => this.actions$.pipe(
            ofType('[Posts API] Remove Post'),
            mergeMap((action: any) => this.postsService.removePost(action.id)
                .pipe(
                    map(res => PostsApiActions.removedPostSuccess({ id: action.id })),
                    catchError(() => EMPTY)
                ))
        )
    )
}   