import { createReducer, on } from "@ngrx/store";
import { PostsApiActions } from "../actions/posts.actions";
import { Post } from "src/app/models/posts.model";

export const initialState: Post[] = []

export const postsReducer = createReducer(
    initialState,
    on(PostsApiActions.retrievedPostsList, (_state, { posts }) => posts),
    on(PostsApiActions.addPostSuccess, (_state, { post }) => [..._state, ...[post]]),
    on(PostsApiActions.editPostSuccess, (_state, { post }) => _state.map((el: Post) => el.id === post.id ? { ...el, ...post } : el)),
    on(PostsApiActions.removedPostSuccess, (_state, { id }) => _state.filter(post => post.id !== id))
)