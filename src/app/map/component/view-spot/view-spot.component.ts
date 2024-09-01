import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Spot} from "../../../interface/spot";
import {MomentModule} from "ngx-moment";
import {SpotComment} from "../../../interface/SpotComment";
import {ViewCommentsComponent} from "../view-comments/view-comments.component";
import {CommentService} from "../../service/comment.service";
import {AddCommentComponent} from "../add-comment/add-comment.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MapService} from "../../service/map.service";
import {SpotService} from "../../service/spot.service";
import {AuthService} from "../../../auth/service/auth.service";
import {Permission} from "../../../interface/Permission";

class CustomSet extends Set<SpotComment> {
  override add(value: SpotComment): this {
    if (!this.has(value))
      super.add(value);

    return this;
  }

  override has(value: SpotComment): boolean {
    for (let item of this) {
      if (item.id === value.id)
        return true;
    }

      return false;
  }
}

@Component({
  selector: 'app-view-spot',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    ViewCommentsComponent,
    AddCommentComponent,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './view-spot.component.html',
  styleUrls: ['./view-spot.component.css','../../../styles/mapStyles.css','../../../styles/buttonStyles.css']
})
export class ViewSpotComponent{
  @Output() ondeleteSpotEmitter = new EventEmitter<Spot>();
  spot!:Spot;
  spotComments:Set<SpotComment> = new CustomSet();
  pageNumber = 0;
  isAddComment = false;
  isMoreCommentToLoad = true;
  isUserPermittedToDelete = false;
  isDataLoaded = false;

  constructor(private commentService: CommentService,private mapService: MapService,
              private spotService: SpotService, public authService: AuthService) {}


  openInGoogleMaps() {
    const cords:google.maps.LatLngLiteral = {lat:this.spot.latitude, lng:this.spot.longitude};
    this.mapService.openInGoogleMaps(cords)
  }

  @Input() set onSelectedSpot(spot:Spot) {
    this.isDataLoaded = false;
    this.spot = spot;
    this.spotComments.clear();
    this.isAddComment = false;
    this.isMoreCommentToLoad = true;
    this.pageNumber = 0;
    const permission:Permission = {username:spot.creatorUsername}
    this.authService.isCurrentUserPermitted(permission).subscribe(
      value => {
        this.isUserPermittedToDelete = value.valueOf();
        this.isDataLoaded = true;
      }
    )
  }

  loadComments() {
    this.commentService.getCommentsForSpotByPage(this.pageNumber,this.spot).subscribe(
      comments => {
        comments.forEach( c => this.spotComments.add(c))
        console.log(this.pageNumber)
        if (this.spotComments.size === this.spot.commentCount)
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
      comment => this.spotComments.add(comment)
    )
    this.spot.commentCount!++;
    this.toggleCommentAdd()
  }

  deleteSpot() {
    this.spotService.deleteSpot(this.spot.id!).subscribe(
      () => this.ondeleteSpotEmitter.emit(this.spot)
    )
  }

  onDeletedComment(comment: SpotComment) {
    this.spot.commentCount!--
    this.spotComments.delete(comment)
  }
}
