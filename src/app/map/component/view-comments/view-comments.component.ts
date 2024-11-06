import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SpotComment} from "../../../interface/SpotComment";
import {MomentModule} from "ngx-moment";
import {CommentService} from "../../service/comment.service";
import {AuthService} from "../../../auth/service/auth.service";
import {Permission} from "../../../interface/Permission";
import {NgIf} from "@angular/common";
import {TextAreaAutoResizeService} from "../../../HtmlDynamicServices/text-area-auto-resize.service";

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
export class ViewCommentsComponent implements OnInit,AfterViewInit{
  @Output() deleteEmitter = new EventEmitter<SpotComment>();
  @Input() comment!:SpotComment;
  isUserPermittedToDelete = false;

  @ViewChild('autoResizeTextarea') textarea!: ElementRef;


  constructor(private commentService: CommentService,
              private authService: AuthService,
              private autoResize: TextAreaAutoResizeService) {}

  ngOnInit() {
    const perms:Permission = {username:this.comment.username}
    this.authService.isCurrentUserPermitted(perms).subscribe(
      value => {
        this.isUserPermittedToDelete = value.valueOf()
        console.log(value)
      }
    )
  }

  ngAfterViewInit() {
    this.textAreaAutoResize();
  }

  deleteComment(){
    this.commentService.deleteComment(this.comment!.uuid!).subscribe(
      () => this.deleteEmitter.emit(this.comment)
    );
  }

  textAreaAutoResize() {
    const textarea = this.textarea.nativeElement as HTMLTextAreaElement;
    this.autoResize.TextAreaAutoResize(textarea)
  }
}
