import { animation, style, animate, trigger, transition, useAnimation, query, stagger, keyframes } from '@angular/animations';
export const animations = [
  trigger('clicked', [
    // Transition from any state to any state
    transition('* => *', [

     query(':leave', stagger('100ms', [
       animate('.4s ease-out', keyframes([
         style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
         style({ opacity: .5, transform: 'scale(1.5)', offset: 0.3 }),
         style({ opacity: 0, transform: 'scale(2)', offset: 1 }),
       ]))]), { optional: true })
   ]),
   ]),
  trigger('scaleUp', [
 // Transition from any state to any state
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

]