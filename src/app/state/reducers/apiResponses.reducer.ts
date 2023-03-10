import { createReducer, on } from "@ngrx/store";
import { APIResponsesActions } from "../actions/apiResponses.actions";
import { ApiReponse } from "src/app/models/response.model";

export const initialState: ApiReponse = { type: '', msg: '' }

export const responseReducer = createReducer(
    initialState,
    on(APIResponsesActions.complete, (_state, { response }) => response),
)