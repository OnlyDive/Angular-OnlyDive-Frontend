import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SpotComment} from "../../../interface/SpotComment";
import {AngularOnlyDiveExeption} from "../../../error/AngularOnlyDiveExeption";

@Component({
  selector: 'app-add-comment',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css','../../../styles/mapStyles.css','../../../styles/mapFormStyles.css',
  '../../../styles/buttonStyles.css']
})
export class AddCommentComponent{
  @Output() onAddSpotComment = new EventEmitter<SpotComment>();
  spotCommentRequest: SpotComment = {name:"",description:""};

  constructor() {}

  onSubmit() {
    if (this.spotCommentRequest.name ==="" || this.spotCommentRequest.description == "")
      throw new AngularOnlyDiveExeption("Please enter a valid data");

    this.onAddSpotComment.emit(this.spotCommentRequest);
  }
}
