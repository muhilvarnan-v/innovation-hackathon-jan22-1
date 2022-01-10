<script lang="ts">
	import { Router, Route } from 'svelte-navigator'

	import Home from './pages/home.svelte'
	import Catalog from './pages/catalog.svelte'
</script>

<main>
	<Router>
		<!-- The home screen -->
		<Route path="/">
			<Home storeName="Ravi's Kirana" />
		</Route>

		<!-- The catalog management screen -->
		<Route path="/catalog">
			<Catalog />
		</Route>
	</Router>
</main>
