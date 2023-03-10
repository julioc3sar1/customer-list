import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/posts.model';
import { PostsApiActions } from 'src/app/state/actions/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {
  @Input() posts!: Post[] | null
  @Output() editPost = new EventEmitter<Post>();
  constructor(
    private store: Store
  ) {

  }

  onEdit(post: Post) {
    this.editPost.emit(post)
  }

  onDelete(postId: string) {
    const action = confirm('Are you sure about performing this action?')
    if (action) this.store.dispatch(PostsApiActions.removePost({ id: postId }))
  }

}
