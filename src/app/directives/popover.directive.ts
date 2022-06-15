import { ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { PopoverComponent } from '../components/popover/popover.component';
import { PopoverDirection, PopoverOpenEvents } from '../model/popover';

@Directive({ selector: '[appPopoverTrigger]' })
export class PopoverDirective {
  @Input('appPopoverTrigger') template!: TemplateRef<object>;
  @Input('appPopoverDirection') direction: PopoverDirection = 'top';
  @Input('appPopoverEvents') events: PopoverOpenEvents[] = ['tap'];

  @Output() readonly open = new EventEmitter<void>();
  @Output() readonly close = new EventEmitter<void>();

  private popoverOpen = false;
  private popoverRef: ComponentRef<PopoverComponent> | undefined;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly viewContainerRef: ViewContainerRef,
  ) { }

  @HostListener('window:touchend', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.events.includes('tap') && event.target instanceof Element) {
      const isClickInsideTrigger = this.elementRef.nativeElement.contains(event.target);
      const isClickInsidePopover = this.popoverRef?.location.nativeElement.contains(event.target);

      if (!this.popoverOpen && isClickInsideTrigger) {
        this.openPopover();
      }
      else if (!isClickInsidePopover) {
        this.closePopover();
      }
    }
  }

  @HostListener('mouseover')
  onMouseOver(): void {
    if (this.events.includes('hover') && !this.popoverOpen) {
      console.log('open me by mouseover')
      this.openPopover();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.events.includes('hover') && this.popoverOpen) {
      this.closePopover();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeClick() {
    this.closePopover();
  }

  private openPopover(): void {
    const templateViewRef = this.viewContainerRef.createEmbeddedView(this.template);

    this.popoverRef = this.viewContainerRef.createComponent(PopoverComponent, {
      index: 1,
      projectableNodes: [templateViewRef.rootNodes]
    });

    this.popoverRef.instance.direction = this.direction;

    this.popoverOpen = true;
    this.open.emit();
  }

  private closePopover(): void {
    this.viewContainerRef.clear();

    this.popoverOpen = false;
    this.close.emit();
  }
}
