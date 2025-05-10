import { atom } from 'jotai';

/**
 * Atom to control the collapsed state of the sidebar.
 * True if collapsed, false if open.
 */
export const sidebarCollapsedAtom = atom(false); // Default to open on larger screens

/**
 * Atom to control the visibility of the sidebar, especially for mobile.
 * True if visible (e.g., drawer is open), false otherwise.
 */
export const mobileSidebarVisibleAtom = atom(false);

/**
 * Atom to indicate if the screen is considered mobile size.
 * This might be set by a hook that detects screen size.
 * For now, we can manually toggle it or set it based on a window resize listener.
 */
export const isMobileAtom = atom(false); // Initialize as false
