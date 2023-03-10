import { createReducer, on } from "@ngrx/store";
import { PostsActions } from "../actions/posts.actions";

export const initialState: string = ''

export const searchReducer = createReducer(
    initialState,
    on(PostsActions.searchPost, (_state, { search }) => search),
)