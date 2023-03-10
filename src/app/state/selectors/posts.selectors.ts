import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";

export const selectPosts = createFeatureSelector<Array<Post>>('posts')

export const selectSortBy = createFeatureSelector<Readonly<string>>('sortBy')

export const selectSearch = createFeatureSelector<Readonly<string>>('search')

export const selectFilteredPosts = createSelector(
    selectPosts,
    selectSearch,
    (posts, search) => {
        return posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    }
)

export const selectOrderedPosts = createSelector(
    selectFilteredPosts,
    selectSortBy,
    (posts, sortBy) => {
        return posts.slice().sort((a: any, b: any) => {
            const nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
            const nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }
)

