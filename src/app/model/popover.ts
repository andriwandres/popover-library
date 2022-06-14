export type PopoverDirection = 'top' | 'right' | 'bottom' | 'left';

export const anchorDirectionMapping: Record<PopoverDirection, PopoverDirection> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
}
