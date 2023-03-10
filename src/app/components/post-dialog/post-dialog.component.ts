import { Component, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PostsActions, PostsApiActions } from 'src/app/state/actions/posts.actions';
import { faker } from '@faker-js/faker';
import { Post } from 'src/app/models/posts.model';
declare var window: any

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent {
  postForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  postModal: any
  @Input() post!: Post | undefined
  @Output() close = new EventEmitter<boolean>();

  loading: boolean = false
  visible: boolean = false
  constructor(
    private store: Store
  ) {

  }

  get aliases() {
    return this.postForm.controls;
  }

  invalidField(control: AbstractControl) {
    if (control.errors) return 'is-invalid'
    return 'is-valid'
  }

  async savePost() {
    const form = this.postForm
    const formValue = form.value
    if (form.valid) {
      this.loading = true
      if (this.post) {
        await this.store.dispatch(PostsActions.editPost(formValue))
      } else {
        formValue.id = faker.datatype.uuid()
        await this.store.dispatch(PostsActions.addPost(formValue));
        this.postForm.reset()
      }
      setTimeout(() => {
        this.loading = false
      }, 1000);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const postChanges = changes['post']
    if (postChanges) {
      const postValue = postChanges.currentValue
      if (postValue != undefined) {
        this.postForm.patchValue({
          id: postValue.id,
          title: postValue.title,
          description: postValue.description,
          status: postValue.status,
        })
        this.postModal.show()
      }
    }
  }

  resetDialog() {
    this.loading = false
    this.postForm.reset()
  }

  ngOnInit() {
    const modalElement = document.getElementById('postModal')
    this.postModal = new window.bootstrap.Modal(modalElement)
    modalElement!.addEventListener('hidden.bs.modal', (event: any) => {
      // do something...
      this.resetDialog()
      this.visible = false
      this.close.emit(true)

    })
  }
}
