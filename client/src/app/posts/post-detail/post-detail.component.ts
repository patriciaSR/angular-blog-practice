import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostDetail } from '../post-detail.model ';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  postInfo$: PostDetail;
  id: string;
  sub: Subscription;

  constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });

    this.sub = this.postsService.getPostById(this.id).subscribe(
      (response) => this.postInfo$ = response,
      (error) => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
