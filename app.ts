/// <reference path='typings/blueimp-md5/blueimp-md5.d.ts' />
import {Component, bootstrap, View} from "angular2/angular2";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, NgFor} from "angular2/angular2";
import {Validators} from 'angular2/angular2';

@Component({
  selector: 'my-app',
  bindings: [FormBuilder]
})
@View({
  directives: [FORM_DIRECTIVES, NgFor],
  template: `
  <div class="main-wrapper">
    <form [ng-form-model]="commentForm" 
        (submit)="onSubmit(commentForm.value)">
      <input type="email"
        id="email" 
        placeholder="Email"
        [ng-form-control]="commentForm.find('email')">
      <textarea id="message"
        placeholder="Message"
        [ng-form-control]="commentForm.find('message')"></textarea>
      <button type="submit">SUBMIT</button>
    </form>
    <div class="comments-section">
      <input placeholder="Filter" (keyup)="filter($event.target.value)">
      <ul>
        <li *ng-for="#comment of comments" [hidden]="!comment.visible">
          <img src="{{comment.avatarUrl}}">
          <span>
            <h3>{{comment.email}}</h3>
            <p>{{comment.message}}</p>
          </span>
        </li>
      </ul>
    </div>
  </div>
  `
})

class CommentsBox {
  commentForm: ControlGroup;
  comments: Array<Comment>;
  currFilter: string;

  constructor(fb: FormBuilder) {
    this.commentForm = fb.group({
      "email":  ["", Validators.required],
      "message":  ["", Validators.required]
    });
    
    this.comments = [];
  }

  onSubmit(newComment) {
    if (this.commentForm.valid) {
      newComment.avatarUrl = "http://www.gravatar.com/avatar/" + md5(newComment.email);
      newComment.visible = true;
      this.comments.push(newComment);
      this.filter();
    }
    else {
      alert("Please enter email and message...");
    }
  }
  
  filter(currFilter = this.currFilter) {
    this.currFilter = currFilter;
    this.comments.forEach(comment => {
      comment.visible = (comment.email.search(this.currFilter) > -1) || (comment.message.search(this.currFilter) > -1);
    });
  }
}

interface Comment {
  email: string;
  message: string;
  avatarUrl: string;
  visible: boolean;
}

bootstrap(CommentsBox);