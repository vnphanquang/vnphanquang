import { type Attachment, createAttachmentKey } from 'svelte/attachments';
import type { HTMLAttributes } from 'svelte/elements';

export function umamiEasterEgg(options: {
	/** @default attribute */
	type?: 'attribute' | 'listener';
	id: string;
}): HTMLAttributes<Element> {
	const { type = 'attribute', id } = options;
	if (type === 'attribute') {
		return {
			'data-umami-event': 'easter-egg',
			'data-umami-event-id': id,
		};
	}
	return {
		[createAttachmentKey()]: ((node) => {
			let clicked = false;
			function track() {
				if (clicked) return;
				window.umami?.track('easter-egg', { id });
				clicked = true;
			}
			node.addEventListener('click', track);
			return () => {
				node.removeEventListener('click', track);
			};
		}) satisfies Attachment<Element>,
	};
}
