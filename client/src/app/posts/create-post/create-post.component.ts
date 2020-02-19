import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsStoreService } from '../posts-store.service';
import { Posts } from '../posts.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;

  constructor(private store: PostsStoreService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  onSendPost($event) {
    $event.preventDefault();
    const title = this.form.get('title').value;
    const content = this.form.get('content').value;
    const image = this.form.get('image').value;

    const newPost: Posts = {
      title,
      content,
      image
    };
    this.store.createPost$(newPost);

  }
}
