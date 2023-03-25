import { JSX } from 'solid-js';

export type Children = JSX.Element | string;
export type ChildrenProps = {
  children?: Children | undefined;
};
