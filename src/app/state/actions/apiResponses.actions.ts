import { createActionGroup, props } from "@ngrx/store";
import { ApiReponse } from "src/app/models/response.model";

export const APIResponsesActions = createActionGroup({
    source: 'API',
    events: {
        'Complete': props<{ response: ApiReponse }>(),
    }
})