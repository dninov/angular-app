import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';
export const animations = [
 
  trigger('scaleUp', [
    transition(':enter', [
      style({opacity: 0, transform: 'scale(50%)' }),
      animate('200ms ease-out', style({ opacity: 1, transform: 'scale(100%)' })),
    ]),
    transition(':leave', [
      style({opacity: 1, transform: 'scale(100%)' }),
      animate('200ms ease-in', style({ opacity: 0, transform: 'scale(50%)' })),
    ]),
  ]),


]