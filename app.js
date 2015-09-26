var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path='typings/blueimp-md5/blueimp-md5.d.ts' />
var angular2_1 = require("angular2/angular2");
var angular2_2 = require("angular2/angular2");
var angular2_3 = require('angular2/angular2');
var CommentsBox = (function () {
    function CommentsBox(fb) {
        this.commentForm = fb.group({
            "email": ["", angular2_3.Validators.required],
            "message": ["", angular2_3.Validators.required]
        });
        this.comments = [];
    }
    CommentsBox.prototype.onSubmit = function (newComment) {
        if (this.commentForm.valid) {
            newComment.avatarUrl = "http://www.gravatar.com/avatar/" + md5(newComment.email);
            newComment.visible = true;
            this.comments.push(newComment);
            this.filter();
        }
        else {
            alert("Please enter email and message...");
        }
    };
    CommentsBox.prototype.filter = function (currFilter) {
        var _this = this;
        if (currFilter === void 0) { currFilter = this.currFilter; }
        this.currFilter = currFilter;
        this.comments.forEach(function (comment) {
            comment.visible = (comment.email.search(_this.currFilter) > -1) || (comment.message.search(_this.currFilter) > -1);
        });
    };
    CommentsBox = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            bindings: [angular2_2.FormBuilder]
        }),
        angular2_1.View({
            directives: [angular2_2.FORM_DIRECTIVES, angular2_2.NgFor],
            template: "\n  <div class=\"main-wrapper\">\n    <form [ng-form-model]=\"commentForm\" \n        (submit)=\"onSubmit(commentForm.value)\">\n      <input type=\"email\"\n        id=\"email\" \n        placeholder=\"Email\"\n        [ng-form-control]=\"commentForm.find('email')\">\n      <textarea id=\"message\"\n        placeholder=\"Message\"\n        [ng-form-control]=\"commentForm.find('message')\"></textarea>\n      <button type=\"submit\">SUBMIT</button>\n    </form>\n    <div class=\"comments-section\">\n      <input placeholder=\"Filter\" (keyup)=\"filter($event.target.value)\">\n      <ul>\n        <li *ng-for=\"#comment of comments\" [hidden]=\"!comment.visible\">\n          <img src=\"{{comment.avatarUrl}}\">\n          <span>\n            <h3>{{comment.email}}</h3>\n            <p>{{comment.message}}</p>\n          </span>\n        </li>\n      </ul>\n    </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [angular2_2.FormBuilder])
    ], CommentsBox);
    return CommentsBox;
})();
angular2_1.bootstrap(CommentsBox);
//# sourceMappingURL=app.js.map