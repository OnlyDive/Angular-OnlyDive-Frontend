import {Component, Input} from '@angular/core';
import {SpotComment} from "../../../interface/SpotComment";
import {MomentModule} from "ngx-moment";

@Component({
  selector: 'app-view-comments',
  standalone: true,
  imports: [
    MomentModule
  ],
  templateUrl: './view-comments.component.html',
  styleUrl: './view-comments.component.css'
})
export class ViewCommentsComponent {
  @Input() comment?:SpotComment;
}
