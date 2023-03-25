import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { NavLink } from '../../types/nav';

export type HeaderProps = {
  title?: string | undefined;
  links: NavLink[];
};

export const Header: Component<HeaderProps> = ({ title, links }) => (
  <div class='w-full navbar bg-base-300'>
    <div class='flex-none lg:hidden'>
      <label
        for='navbar-drawer'
        class='btn btn-square btn-ghost'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          class='inline-block w-6 h-6 stroke-current'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M4 6h16M4 12h16M4 18h16'
          ></path>
        </svg>
      </label>
    </div>
    <div class='flex-1 ml-2'>
      <a
        href='/'
        rel='prefetch'
        class='btn btn-ghost normal-case text-xl'
      >
        <img
          src='/android-chrome-192x192.png'
          width='32'
          height='32'
          alt={'\u2612'}
          class='mr-2'
        />
        {title}
      </a>
    </div>
    <div class='flex-none hidden lg:block mr-2'>
      <ul class='menu menu-horizontal'>
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
                  class='rounded-lg'
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt={img.alt}
                      width='24'
                      height='24'
                    />
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
  </div>
);
