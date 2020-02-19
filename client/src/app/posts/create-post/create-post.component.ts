import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../post.model ';
import { PostsStoreService } from '../posts-store.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;

  constructor(private store: PostsStoreService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  async onSendPost($event) {
    $event.preventDefault();

    const newPost: Post = this.form.value;
    const response = await this.store.createPost$(newPost);

    this.router.navigate([`posts/${response._id}`]);
  }
}
