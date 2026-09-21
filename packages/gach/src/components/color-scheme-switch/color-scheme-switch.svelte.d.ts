import type { Component } from 'svelte';
import type { HTMLFormAttributes } from 'svelte/elements';

import type { ColorScheme } from '@vnphanquang/gach/constants';

export interface ColorSchemeSwitchProps extends Omit<HTMLFormAttributes, 'onselect'> {
	colorScheme?: ColorScheme;
	onselect?: (scheme: ColorScheme) => void;
}

/** Dropdown menu for switching global color scheme. */
declare const ColorSchemeSwitch: Component<ColorSchemeSwitchProps>;
export default ColorSchemeSwitch;
