
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const icon_zoom: string;
	export const WINDOWID: string;
	export const allowSubstitutes: string;
	export const __ETC_PROFILE_DONE: string;
	export const GC_LARGE_ALLOC_WARN_INTERVAL: string;
	export const GHOSTTY_BIN_DIR: string;
	export const COLORTERM: string;
	export const XDG_CONFIG_DIRS: string;
	export const hardeningDisable: string;
	export const NIX_LD_LIBRARY_PATH: string;
	export const TERM_PROGRAM_VERSION: string;
	export const GTK_IM_MODULE: string;
	export const configureFlags: string;
	export const mesonFlags: string;
	export const TMUX: string;
	export const PKG_CONFIG_PATH: string;
	export const DEVENV_TASK_FILE: string;
	export const I3SOCK: string;
	export const NODE: string;
	export const icon_session: string;
	export const DEVENV_CMDLINE: string;
	export const SYSTEMD_XKB_DIRECTORY: string;
	export const SSH_AUTH_SOCK: string;
	export const color_gray_300: string;
	export const STRINGS: string;
	export const XCURSOR_PATH: string;
	export const XMODIFIERS: string;
	export const GDK_PIXBUF_MODULE_FILE: string;
	export const NO_AT_BRIDGE: string;
	export const XCURSOR_SIZE: string;
	export const arrow_left: string;
	export const GPG_TTY: string;
	export const EDITOR: string;
	export const _DEVENV_DIFF: string;
	export const GST_PLUGIN_SYSTEM_PATH_1_0: string;
	export const color_gray_950: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const NIX_PROFILES: string;
	export const SOURCE_DATE_EPOCH: string;
	export const LOGNAME: string;
	export const XDG_SESSION_TYPE: string;
	export const NIX_ENFORCE_NO_NATIVE: string;
	export const MANPATH: string;
	export const NIX_PATH: string;
	export const icon_copy: string;
	export const NIXPKGS_CONFIG: string;
	export const CXX: string;
	export const XAUTHORITY: string;
	export const icon_lock: string;
	export const system: string;
	export const color_gray_900: string;
	export const color_gray_700: string;
	export const color_gray_600: string;
	export const DEVENV_DOTFILE: string;
	export const color_gray_500: string;
	export const TERMINAL: string;
	export const WINDOWPATH: string;
	export const color_gray_400: string;
	export const color_bg: string;
	export const IN_NIX_SHELL: string;
	export const GI_TYPELIB_PATH: string;
	export const GHOSTTY_SHELL_FEATURES: string;
	export const HOME: string;
	export const NIX_BINTOOLS: string;
	export const SSH_ASKPASS: string;
	export const LANG: string;
	export const TMUX_TMPDIR: string;
	export const LS_COLORS: string;
	export const npm_package_version: string;
	export const STARSHIP_SHELL: string;
	export const cmakeFlags: string;
	export const STARSHIP_CONFIG: string;
	export const color_gray_800: string;
	export const GIO_EXTRA_MODULES: string;
	export const NIX_STORE: string;
	export const DEVENV_ROOT: string;
	export const LD: string;
	export const pnpm_config_verify_deps_before_run: string;
	export const DIRENV_CONFIG: string;
	export const INIT_CWD: string;
	export const arrow_right: string;
	export const READELF: string;
	export const GTK_A11Y: string;
	export const color_gray_200: string;
	export const STARSHIP_SESSION_KEY: string;
	export const NIX_USER_PROFILE_DIR: string;
	export const INFOPATH: string;
	export const npm_lifecycle_script: string;
	export const icon_user: string;
	export const SKIP_FCITX_USER_PATH: string;
	export const GHOSTTY_RESOURCES_DIR: string;
	export const DEVENV_RELOAD_FILE: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const TERMINFO: string;
	export const npm_package_name: string;
	export const GTK_PATH: string;
	export const color_gray_25: string;
	export const SIZE: string;
	export const USER: string;
	export const icon_compass_off: string;
	export const TMUX_PANE: string;
	export const TZDIR: string;
	export const NIX_LD: string;
	export const AR: string;
	export const AS: string;
	export const NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const color_gray_100: string;
	export const DEVENV_TASKS: string;
	export const SHLVL: string;
	export const DEVENV_RUNTIME: string;
	export const NM: string;
	export const PAGER: string;
	export const NIX_CFLAGS_COMPILE: string;
	export const QTWEBKIT_PLUGIN_PATH: string;
	export const QT_IM_MODULE: string;
	export const __NIXOS_SET_ENVIRONMENT_DONE: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const _DEVENV_HOOK_DIR: string;
	export const LOCALE_ARCHIVE: string;
	export const LESSKEYIN_SYSTEM: string;
	export const npm_config_user_agent: string;
	export const TERMINFO_DIRS: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_execpath: string;
	export const DEVENV_PROFILE: string;
	export const XDG_RUNTIME_DIR: string;
	export const color_primary: string;
	export const color_fg: string;
	export const NIX_PKG_CONFIG_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const NODE_PATH: string;
	export const OBJCOPY: string;
	export const NIX_XDG_DESKTOP_PORTAL_DIR: string;
	export const npm_package_json: string;
	export const icon_bell: string;
	export const STRIP: string;
	export const NIXOS_XDG_OPEN_USE_PORTAL: string;
	export const color_gray_50: string;
	export const XCURSOR_THEME: string;
	export const _DEVENV_PATH: string;
	export const icon_compass_on: string;
	export const XDG_DATA_DIRS: string;
	export const HUSHLOGIN: string;
	export const LIBEXEC_PATH: string;
	export const OBJDUMP: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const __fish_nixos_env_preinit_sourced: string;
	export const CC: string;
	export const NIX_CC: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const DEVENV_STATE: string;
	export const QT_PLUGIN_PATH: string;
	export const CONFIG_SHELL: string;
	export const npm_node_execpath: string;
	export const RANLIB: string;
	export const NIX_HARDENING_ENABLE: string;
	export const NIX_LDFLAGS: string;
	export const name: string;
	export const TERM_PROGRAM: string;
	export const PKG_CONFIG: string;
	export const GHOSTTY_SURFACE_ID: string;
	export const NODE_ENV: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		icon_zoom: string;
		WINDOWID: string;
		allowSubstitutes: string;
		__ETC_PROFILE_DONE: string;
		GC_LARGE_ALLOC_WARN_INTERVAL: string;
		GHOSTTY_BIN_DIR: string;
		COLORTERM: string;
		XDG_CONFIG_DIRS: string;
		hardeningDisable: string;
		NIX_LD_LIBRARY_PATH: string;
		TERM_PROGRAM_VERSION: string;
		GTK_IM_MODULE: string;
		configureFlags: string;
		mesonFlags: string;
		TMUX: string;
		PKG_CONFIG_PATH: string;
		DEVENV_TASK_FILE: string;
		I3SOCK: string;
		NODE: string;
		icon_session: string;
		DEVENV_CMDLINE: string;
		SYSTEMD_XKB_DIRECTORY: string;
		SSH_AUTH_SOCK: string;
		color_gray_300: string;
		STRINGS: string;
		XCURSOR_PATH: string;
		XMODIFIERS: string;
		GDK_PIXBUF_MODULE_FILE: string;
		NO_AT_BRIDGE: string;
		XCURSOR_SIZE: string;
		arrow_left: string;
		GPG_TTY: string;
		EDITOR: string;
		_DEVENV_DIFF: string;
		GST_PLUGIN_SYSTEM_PATH_1_0: string;
		color_gray_950: string;
		XDG_SEAT: string;
		PWD: string;
		NIX_PROFILES: string;
		SOURCE_DATE_EPOCH: string;
		LOGNAME: string;
		XDG_SESSION_TYPE: string;
		NIX_ENFORCE_NO_NATIVE: string;
		MANPATH: string;
		NIX_PATH: string;
		icon_copy: string;
		NIXPKGS_CONFIG: string;
		CXX: string;
		XAUTHORITY: string;
		icon_lock: string;
		system: string;
		color_gray_900: string;
		color_gray_700: string;
		color_gray_600: string;
		DEVENV_DOTFILE: string;
		color_gray_500: string;
		TERMINAL: string;
		WINDOWPATH: string;
		color_gray_400: string;
		color_bg: string;
		IN_NIX_SHELL: string;
		GI_TYPELIB_PATH: string;
		GHOSTTY_SHELL_FEATURES: string;
		HOME: string;
		NIX_BINTOOLS: string;
		SSH_ASKPASS: string;
		LANG: string;
		TMUX_TMPDIR: string;
		LS_COLORS: string;
		npm_package_version: string;
		STARSHIP_SHELL: string;
		cmakeFlags: string;
		STARSHIP_CONFIG: string;
		color_gray_800: string;
		GIO_EXTRA_MODULES: string;
		NIX_STORE: string;
		DEVENV_ROOT: string;
		LD: string;
		pnpm_config_verify_deps_before_run: string;
		DIRENV_CONFIG: string;
		INIT_CWD: string;
		arrow_right: string;
		READELF: string;
		GTK_A11Y: string;
		color_gray_200: string;
		STARSHIP_SESSION_KEY: string;
		NIX_USER_PROFILE_DIR: string;
		INFOPATH: string;
		npm_lifecycle_script: string;
		icon_user: string;
		SKIP_FCITX_USER_PATH: string;
		GHOSTTY_RESOURCES_DIR: string;
		DEVENV_RELOAD_FILE: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		TERMINFO: string;
		npm_package_name: string;
		GTK_PATH: string;
		color_gray_25: string;
		SIZE: string;
		USER: string;
		icon_compass_off: string;
		TMUX_PANE: string;
		TZDIR: string;
		NIX_LD: string;
		AR: string;
		AS: string;
		NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		color_gray_100: string;
		DEVENV_TASKS: string;
		SHLVL: string;
		DEVENV_RUNTIME: string;
		NM: string;
		PAGER: string;
		NIX_CFLAGS_COMPILE: string;
		QTWEBKIT_PLUGIN_PATH: string;
		QT_IM_MODULE: string;
		__NIXOS_SET_ENVIRONMENT_DONE: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		_DEVENV_HOOK_DIR: string;
		LOCALE_ARCHIVE: string;
		LESSKEYIN_SYSTEM: string;
		npm_config_user_agent: string;
		TERMINFO_DIRS: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_execpath: string;
		DEVENV_PROFILE: string;
		XDG_RUNTIME_DIR: string;
		color_primary: string;
		color_fg: string;
		NIX_PKG_CONFIG_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		NODE_PATH: string;
		OBJCOPY: string;
		NIX_XDG_DESKTOP_PORTAL_DIR: string;
		npm_package_json: string;
		icon_bell: string;
		STRIP: string;
		NIXOS_XDG_OPEN_USE_PORTAL: string;
		color_gray_50: string;
		XCURSOR_THEME: string;
		_DEVENV_PATH: string;
		icon_compass_on: string;
		XDG_DATA_DIRS: string;
		HUSHLOGIN: string;
		LIBEXEC_PATH: string;
		OBJDUMP: string;
		PATH: string;
		npm_config_node_gyp: string;
		__fish_nixos_env_preinit_sourced: string;
		CC: string;
		NIX_CC: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		DEVENV_STATE: string;
		QT_PLUGIN_PATH: string;
		CONFIG_SHELL: string;
		npm_node_execpath: string;
		RANLIB: string;
		NIX_HARDENING_ENABLE: string;
		NIX_LDFLAGS: string;
		name: string;
		TERM_PROGRAM: string;
		PKG_CONFIG: string;
		GHOSTTY_SURFACE_ID: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
