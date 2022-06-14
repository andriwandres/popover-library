import { Directive, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PopoverComponent } from '../components/popover/popover.component';
import { PopoverDirection } from '../model/popover';

@Directive({ selector: '[appPopoverTrigger]' })
export class PopoverDirective {
  @Input('appPopoverTrigger') template!: TemplateRef<object>;
  @Input('appPopoverText') text!: string;
  @Input('appPopoverOffset') offset!: number;
  @Input('appPopoverDirection') direction!: PopoverDirection;

  private popoverOpen = false;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
  ) { }

  ngAfterViewInit(): void {
    this.onClick();
  }

  @HostListener('click', ['$event'])
  onClick(): void {
    if (this.popoverOpen) return;

    const templateViewRef = this.viewContainerRef.createEmbeddedView(this.template);

    const popover = this.viewContainerRef.createComponent(PopoverComponent, {
      index: 1,
      projectableNodes: [templateViewRef.rootNodes]
    });

    popover.instance.direction = this.direction;
    popover.instance.offset = this.offset;

    this.popoverOpen = true;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydowappandler(event: KeyboardEvent) {
    event.preventDefault();
    this.viewContainerRef.clear();

    this.popoverOpen = false;
  }
}
