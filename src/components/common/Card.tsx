import type { Component } from 'solid-js';
import type { Children, ChildrenProps } from '../../types/children';

export type CardProps = ChildrenProps & {
  title?: Children | undefined;
  actions?: Children | undefined;
};

export const Card: Component<CardProps> = ({ children, title, actions }) => (
  <div class='card w-full bg-base-100 shadow-xl'>
    <div class='card-body'>
      <h2 class='card-title'>{title}</h2>
      {children}
      <div class='card-actions justify-end'>{actions}</div>
    </div>
  </div>
);
