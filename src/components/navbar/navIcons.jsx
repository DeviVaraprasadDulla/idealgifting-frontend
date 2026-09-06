/**
 * Inline SVGs reproducing the reference's exact icon paths (stroke-based,
 * 1.6 stroke-width, round caps/joins) rather than substituting a generic
 * icon library shape.
 */
export const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const HeartIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12 20s-7-4.6-7-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7 3c0 4.8-7 9.4-7 9.4z" />
  </svg>
);

export const AccountIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="8.5" r="3.6" />
    <path d="M4.8 20c.9-3.6 3.7-5.6 7.2-5.6s6.3 2 7.2 5.6" />
  </svg>
);

export const GiftBoxIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M3.5 8.5h17v11a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z" />
    <path d="M12 8.5V21" />
    <path d="M12 8.5S9.6 3 7.4 3.6 8.3 8.5 12 8.5s6.8.6 4.6-4.9S12 8.5 12 8.5z" />
  </svg>
);

export const BurgerIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const ChevronIcon = (props) => (
  <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M1 1l5 5 5-5" strokeLinecap="round" />
  </svg>
);

export const AnniversaryIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12 20s-7-4.6-7-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7 3c0 4.8-7 9.4-7 9.4z" />
  </svg>
);

export const BirthdayIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M4 21v-8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8z" />
    <path d="M4 15h16M9 11V7M15 11V7M12 11V4" />
    <circle cx="12" cy="3" r="1" />
  </svg>
);
