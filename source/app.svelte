<script lang="ts">
	import { Router, Route } from 'svelte-navigator'

	import Home from './pages/home.svelte'
	import Catalog from './pages/catalog.svelte'
</script>

<main>
	<Router>
		<Route path="/">
			<Home />
		</Route>

		<Route path="/catalog">
			<Catalog />
		</Route>
	</Router>
</main>
