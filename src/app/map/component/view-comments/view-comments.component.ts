import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpotComment} from "../../../interface/SpotComment";
import {MomentModule} from "ngx-moment";
import {CommentService} from "../../service/comment.service";
import {AuthService} from "../../../auth/service/auth.service";
import {Permission} from "../../../interface/Permission";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-view-comments',
  standalone: true,
  imports: [
    MomentModule,
    NgIf
  ],
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css','../../../styles/buttonStyles.css']
})
export class ViewCommentsComponent implements OnInit{
  @Output() deleteEmitter = new EventEmitter<SpotComment>();
  @Input() comment!:SpotComment;
  isUserPermittedToDelete = false;

  constructor(private commentService: CommentService,
              private authService: AuthService) {}

  ngOnInit() {
    const perms:Permission = {username:this.comment.username}
    this.authService.isCurrentUserPermitted(perms).subscribe(
      value => {
        this.isUserPermittedToDelete = value.valueOf()
        console.log(value)
      }
    )
  }

  deleteComment(){
    this.commentService.deleteComment(this.comment!.id!).subscribe(
      () => this.deleteEmitter.emit(this.comment)
    );
  }
}
