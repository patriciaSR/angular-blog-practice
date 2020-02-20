import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.model ';
import { PostsStoreService } from '../posts-store.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;
  postID: string;

  constructor(
    private store: PostsStoreService,
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.postID = params.id;
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });

    if (this.postID) {
      this.postsService.getPostById(this.postID).subscribe(
        (response) => {
          this.form.get('title').setValue(response.title);
          this.form.get('content').setValue(response.content);
          this.form.get('image').setValue(response.image);
        },
        (error) => console.log(error)
      );
    }
  }

  async onSendPost() {
    const newPost: Post = this.form.value;
    const response = await this.store.createPost$(newPost);

    this.router.navigate([`posts/${response._id}`]);
  }

  async onUpdatePost() {
    const newPost: Post = this.form.value;
    const response = await this.store.updatePost$(this.postID, newPost);

    this.router.navigate([`posts/${this.postID}`]);
  }
}
