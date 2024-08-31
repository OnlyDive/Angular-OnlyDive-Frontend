import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SpotComment} from "../../../interface/SpotComment";
import {MomentModule} from "ngx-moment";
import {CommentService} from "../../service/comment.service";

@Component({
  selector: 'app-view-comments',
  standalone: true,
  imports: [
    MomentModule
  ],
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css','../../../styles/buttonStyles.css']
})
export class ViewCommentsComponent {
  @Output() deleteEmitter = new EventEmitter<SpotComment>();
  @Input() comment?:SpotComment;

  constructor(private commentService: CommentService) {}

  deleteComment(){
    this.commentService.deleteComment(this.comment!.id!).subscribe(
      () => this.deleteEmitter.emit(this.comment)
    );
  }
}
