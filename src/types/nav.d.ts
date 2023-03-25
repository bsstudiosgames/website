export type NavLink = {
  href: string;
  text: string;
  img?:
    | {
        src: string;
        alt: string;
      }
    | undefined;
};
