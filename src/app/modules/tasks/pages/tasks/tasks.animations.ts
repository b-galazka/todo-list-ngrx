import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const listSlideInOut = trigger('listSlideInOut', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateX(-25%)' }),
        stagger(50, [animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))])
      ],
      { optional: true }
    ),

    query(':leave', [animate('300ms', style({ opacity: 0, transform: 'translateX(25%)' }))], {
      optional: true
    })
  ])
]);
