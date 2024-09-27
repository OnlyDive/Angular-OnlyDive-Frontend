import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SpotComment} from "../../../interface/SpotComment";
import {AngularOnlyDiveExeption} from "../../../error/AngularOnlyDiveExeption";
import {TextAreaAutoResizeService} from "../../../HtmlDynamicServices/text-area-auto-resize.service";

@Component({
  selector: 'app-add-comment',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css','../../../styles/map-popUp.css','../../../styles/mapFormStyles.css',
  '../../../styles/buttonStyles.css']
})
export class AddCommentComponent{
  @Output() onAddSpotComment = new EventEmitter<SpotComment>();
  spotCommentRequest: SpotComment = {name:"",description:""};

  constructor(private autoResize: TextAreaAutoResizeService) {}

  onSubmit() {
    if (this.spotCommentRequest.name ==="" || this.spotCommentRequest.description == "")
      throw new AngularOnlyDiveExeption("Please enter a valid data");

    this.onAddSpotComment.emit(this.spotCommentRequest);
  }

  TextAreaAutoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.autoResize.TextAreaAutoResize(textarea)
  }
}
