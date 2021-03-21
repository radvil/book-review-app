/**
 * this piece of code stolen from 'https://github.com/filipows/angular-animations'
 * because i don't need all of the animations library 😅
 * 
 */

import { animateChild, group, query, useAnimation, AnimationReferenceMetadata } from '@angular/animations';

import { IAnimationOptions } from '../_interfaces';

export function useAnimationIncludingChildren(animation: AnimationReferenceMetadata, options?: IAnimationOptions) {
  return [
    ...(options && options.animateChildren === 'before' ? [query('@*', animateChild(), { optional: true })] : []),
    group([
      useAnimation(animation),
      ...(!options || !options.animateChildren || options.animateChildren === 'together'
        ? [query('@*', animateChild(), { optional: true })]
        : [])
    ]),
    ...(options && options.animateChildren === 'after' ? [query('@*', animateChild(), { optional: true })] : [])
  ];
}
