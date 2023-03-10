import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { faker } from '@faker-js/faker';
import { selectPosts, selectOrderedPosts, selectFilteredPosts } from 'src/app/state/selectors/posts.selectors';
import { PostsActions } from 'src/app/state/actions/posts.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts$ = this.store.select(selectPosts)
  post!: Post | undefined

  constructor(
    private store: Store
  ) {
    const localStoragePosts = localStorage.getItem('posts')
    if (localStoragePosts === null) {
      localStorage.setItem('posts', JSON.stringify(this.generateDummyPosts()))
    }

  }

  generateDummyPosts(): Post[] {
    let posts: Post[] = []
    for (let i = 0; i < 20; i++) {
      posts = [...posts, ...[this.createRandomPost()]]
    }
    return posts
  }

  createRandomPost(): Post {
    return {
      id: faker.datatype.uuid(),
      title: faker.name.jobTitle(),
      description: faker.lorem.sentence(10),
      status: faker.helpers.arrayElement(['active', 'pending', 'inactive']),
    };
  }

  sortPosts(event: any) {
    const column: string = event.target.value
    this.store.dispatch(PostsActions.sortPosts({ column }))
    this.posts$ = this.store.select(selectOrderedPosts)
  }

  searchPost(event: any) {
    const value = event.target.value
    this.store.dispatch(PostsActions.searchPost({ search: value }))

    if (value.length > 0) {
      this.posts$ = this.store.select(selectFilteredPosts)
    } else {
      this.store.select(selectPosts)
    }
  }

  ngOnInit() {
    this.store.dispatch({ type: '[Posts] Load Posts' });
  }
}
