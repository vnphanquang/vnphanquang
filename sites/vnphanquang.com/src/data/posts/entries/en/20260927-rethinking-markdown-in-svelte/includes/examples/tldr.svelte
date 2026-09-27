<script>
	// [!code word:markdown]
	import { markdown } from 'svelte-md-template';
	const foo = 'bar';
</script>

{markdown`
# My Markdown Content

Variable can be injected as expected: ${foo}
All templates are merged, e.g. write [link-reference-definition] in one block and use in others.
`}

{markdown`
[link-reference-definition]: https://spec.commonmark.org/0.31.2/#link-reference-definition
`}
