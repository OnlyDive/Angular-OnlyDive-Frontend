import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Spot} from "../../../interface/spot";
import {ButtonComponent} from "../../../tools/button/button.component";
import {MomentModule} from "ngx-moment";
import {SpotComment} from "../../../interface/SpotComment";
import {ViewCommentsComponent} from "../view-comments/view-comments.component";
import {CommentService} from "../../service/comment.service";
import {AddCommentComponent} from "../add-comment/add-comment.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-view-spot',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    MomentModule,
    ViewCommentsComponent,
    AddCommentComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './view-spot.component.html',
  styleUrls: ['./view-spot.component.css','../../../styles/mapStyles.css','../../../styles/buttonStyles.css']
})
export class ViewSpotComponent{
  @Input() spot!:Spot;
  spotComments:SpotComment[] = [];
  pageNumber:number = 1;
  isAddComment:boolean = false;
  isMoreCommentToLoad:boolean = true;

  constructor(private commentService: CommentService) {}


  openInGoogleMaps() {
    const url = `https://www.google.com/maps?q=${this.spot.latitude},${this.spot.longitude}`;
    window.open(url, '_blank');
  }

  loadComments() {
    this.commentService.getCommentsForSpotByPage(this.pageNumber,this.spot).subscribe(
      comments => {

        this.spotComments = this.spotComments.concat(comments)
        if (this.spotComments.length === this.spot.commentCount)
          this.isMoreCommentToLoad = false;
      }
    )
    this.pageNumber++;
  }

  toggleCommentAdd(){
    this.isAddComment = !this.isAddComment;
  }

  addComment(comment: SpotComment) {
    comment.spotId = this.spot.id;

    this.commentService.createComment(comment).subscribe(
      comment => this.spotComments.push(comment)
    )
    this.spot.commentCount!++;
    this.toggleCommentAdd()
  }
}
