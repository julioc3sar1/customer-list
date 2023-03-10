import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor() { }

    getLsPosts() {
        return JSON.parse(localStorage.getItem('posts')!)
    }

    setLsPosts(posts: Post[]) {
        localStorage.setItem('posts', JSON.stringify(posts))
    }

    getPosts(): Observable<Array<Post>> {
        const posts = new Observable<Array<Post>>((subscriber) => {
            subscriber.next(this.getLsPosts());
        });
        return posts
    }

    addPost(post: Post): Observable<Post> {
        const posts = [...this.getLsPosts(), ...[post]]
        return new Observable<Post>((subscriber) => {
            try {
                this.setLsPosts(posts)
                subscriber.next(post)
            } catch (err) {
                subscriber.error('Something happened')
            }
        })
    }

    editPost(editedPost: Post): Observable<Post> {
        const posts = this.getLsPosts().map((post: Post) => editedPost.id === post.id ? { ...post, ...editedPost } : post)
        return new Observable<Post>((subscriber) => {
            try {
                this.setLsPosts(posts)
                subscriber.next(editedPost)
            } catch (err) {
                subscriber.error('Something happened')
            }
        })
    }

    removePost(postId: string): Observable<Boolean> {
        const posts = this.getLsPosts().filter((post: Post) => post.id !== postId)
        this.setLsPosts(posts)
        return new Observable<Boolean>((subscriber) => {
            subscriber.next(true)
        })
    }
}