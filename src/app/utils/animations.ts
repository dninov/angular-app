import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';
export const animations = [
  trigger('fadeSlideFromTop', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-10px)' }),
      animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
  ]),
  trigger('fadeSlideFromBottomDelay1', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      animate('400ms 200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
  ]),
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
  trigger('scaleUpDelay2', [
    transition(':enter', [
      style({opacity: 0, transform: 'scale(50%)' }),
      animate('400ms 400ms ease-out', style({ opacity: 1, transform: 'scale(100%)' })),
    ]),
  
  ]),
  trigger('scaleDown', [

  ]),
]