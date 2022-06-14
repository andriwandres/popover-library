import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { anchorDirectionMapping, PopoverDirection } from 'src/app/model/popover';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  @Input() offset!: number;
  @Input() direction!: PopoverDirection;

  @HostBinding('class')
  public hostClass!: string;

  ngOnInit(): void {
    if (this.direction) {
      const anchorDirection = anchorDirectionMapping[this.direction];

      const anchorClass = `anchor--${anchorDirection}`;
      const positionClass = `position--${this.direction}`;

      this.hostClass = `${positionClass} ${anchorClass}`;
    }
  }
}
