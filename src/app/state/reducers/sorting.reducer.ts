import { createReducer, on } from "@ngrx/store";
import { PostsActions } from "../actions/posts.actions";

export const initialState: string = ''

export const sortingReducer = createReducer(
    initialState,
    on(PostsActions.sortPosts, (_state, { column }) => column),
)