import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { NavLink } from '../../types/nav';

export type NavbarProps = {
  links: NavLink[];
};

export const Navbar: Component<NavbarProps> = ({ links }) => (
  <div class='drawer-side'>
    <label
      for='navbar-drawer'
      class='drawer-overlay'
    ></label>
    <ul class='menu p-4 w-80 bg-base-100'>
      <For each={links}>
        {({ href, text, img }, i) => {
          const a = href.startsWith('/')
            ? { rel: 'prefetch' }
            : { target: '_blank' };

          return (
            <li>
              <a
                {...a}
                href={href}
              >
                {img ? (
                  <div class='flex gap-2'>
                    <img
                      src={img.src}
                      alt={img.alt}
                      width='24'
                      height='24'
                    />
                    {text}
                  </div>
                ) : (
                  text
                )}
              </a>
            </li>
          );
        }}
      </For>
    </ul>
  </div>
);
