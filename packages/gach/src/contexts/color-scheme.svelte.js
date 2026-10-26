import { getContext, setContext } from 'svelte';
import { MediaQuery } from 'svelte/reactivity';

/** @import { ColorScheme } from '../constants' */

/**
 * @typedef ColorSchemeContextInit
 * @property {string} [cookieName] name of the cookie used to store user preference.
 * @property {ColorScheme} [user] cached user's preference, defaults to 'system'.
 */

export class ColorSchemeContext {
	static KEY = Symbol('app:color-scheme');

	/** @type {() => ColorSchemeContextInit} */
	#getter = () => ({
		cookieName: undefined,
		user: 'system',
	});

	/** @type {string | undefined} */
	#cookieName = $derived.by(() => this.#getter().cookieName);
	#preferredColorScheme = new MediaQuery('(prefers-color-scheme: dark)');

	/** @type {Exclude<ColorScheme, 'system'>} */
	system = $derived(this.#preferredColorScheme.current ? 'dark' : 'light');

	/** @type {ColorScheme} */
	user = $derived.by(() => this.#getter().user ?? 'system');

	/** @type {Exclude<ColorScheme, 'system'>} */
	resolved = $derived(this.user === 'system' ? this.system : this.user);

	/**
	 * @param {() => ColorSchemeContextInit} init
	 */
	constructor(init) {
		this.#getter = init;
		$effect(() => {
			if ('window' in globalThis) {
				document.documentElement.dataset.colorScheme = this.user;
				if (this.#cookieName) {
					document.cookie = `${this.#cookieName}=${this.user}; path=/; SameSite=Lax; Secure; Max-Age=604800`;
				}
			}
		});
	}

	/**
	 * @param {ColorScheme} scheme
	 * @returns {Exclude<ColorScheme, 'system'>}
	 */
	resolve = (scheme) => {
		return scheme === 'system' ? this.system : scheme;
	};

	/**
	 * @param {() => ColorSchemeContextInit} init
	 * @returns {ColorSchemeContext}
	 */
	static set(init) {
		return setContext(ColorSchemeContext.KEY, new ColorSchemeContext(init));
	}

	/**
	 * @returns {ColorSchemeContext}
	 */
	static get() {
		return getContext(ColorSchemeContext.KEY);
	}
}
