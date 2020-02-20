// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { PostDetailComponent } from './post-detail.component';

// const apiConfig = {
//   api: 'https://localhost:3443'
// };

// const fakeActivatedRoute = {
//   params: {
//       id: '123'
//   }
// };

// describe('PostDetailComponent', () => {
//   let component: PostDetailComponent;
//   let fixture: ComponentFixture<PostDetailComponent>;

//   beforeEach((() => {
//     TestBed.configureTestingModule({
//       declarations: [PostDetailComponent],
//       imports: [HttpClientTestingModule, RouterTestingModule],
//       providers: [
//         { provide: 'apiConfig', useValue: apiConfig },
//         { provide: ActivatedRoute,  useValue: fakeActivatedRoute },
//       ]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PostDetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
