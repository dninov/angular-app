import { animation, style, animate, trigger, transition, useAnimation, query, stagger, keyframes } from '@angular/animations';
export const animations = [
  trigger('scaleUp', [
 transition('* => *', [
  query(':enter', style({ opacity: 0 }), { optional: true }),

  query(':enter', stagger('100ms', [
    animate('.3s ease-in', keyframes([
      style({ opacity: 0, transform: 'scale(0.8)', offset: 0 }),
      style({ opacity: .5, transform: 'scale(0.9)', offset: 0.3 }),
      style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
    ]))]), { optional: true }),
  query(':leave', stagger('100ms', [
    animate('.3s ease-out', keyframes([
      style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
      style({ opacity: .5, transform: 'scale(0.9)', offset: 0.3 }),
      style({ opacity: 0, transform: 'scale(0.8)', offset: 1 }),
    ]))]), { optional: true })
]),
]),
trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0
      }),
    ], { optional: true }),
    query(':leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0
      }),
    ], { optional: true }),
    query(':enter', [
      animate('1s ease-out', style({ opacity: 1 })),
    ], { optional: true }),
  ]),
])


]
