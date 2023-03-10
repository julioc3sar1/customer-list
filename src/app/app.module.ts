import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NavigationComponent } from './components/navigation/navigation.component';

import { postsReducer } from './state/reducers/posts.reducer';
import { sortingReducer } from './state/reducers/sorting.reducer';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/effects/posts.effects';
import { searchReducer } from './state/reducers/search.reducer';
import { PostsComponent } from './components/posts/posts.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PostsComponent,
    PostsListComponent,
    PostDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      posts: postsReducer,
      sortBy: sortingReducer,
      search: searchReducer
    }, {

    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([
      PostsEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
