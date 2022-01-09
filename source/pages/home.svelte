<script lang="ts">
	import { Router, Route, Link } from 'svelte-navigator'
	import { ShoppingBagIcon, ShoppingCartIcon } from 'svelte-feather-icons'
</script>

<main>
	<h1 class="rounded">Ravi's Kirana</h1>

	<table class="center">
		<tr>
			<td colspan="2">
				<div id="top-notification" class="card notification-card">
					<h4 class="title">Need your attention</h4>
					<span class="message"
						>Your order from Choudhary Traders is due to arrive today.</span
					>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<Link to="/catalog">
					<div id="goto-catalog" class="card goto-card unstyled-link">
						<ShoppingBagIcon class="icon" size="36" />
						<p>Catalog</p>
					</div>
				</Link>
			</td>
			<td>
				<div id="goto-orders" class="card goto-card">
					<ShoppingCartIcon class="icon" size="36" />
					<p>Orders</p>
				</div>
			</td>
		</tr>
	</table>
</main>

<svelte:head>
	<style>
		body {
			background-color: #a4abb850;
		}
	</style>
</svelte:head>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

	main {
		font-family: 'Poppins', sans-serif;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		background-color: #ffffff;
		border-radius: 1em;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		width: 42em;
		padding-bottom: 2em;
	}

	h1 {
		display: auto;
		background-color: #1f2633;
		color: #ffffff;
		padding: 0.5em 1em;
	}

	table {
		border-collapse: separate;
		border-spacing: 50px 0;
	}
	td {
		padding: 10px 0;
	}
	tr {
		padding: 10px 0;
	}

	.unstyled-link {
		text-decoration: none;
		color: #333333;
	}

	.center {
		margin-left: auto;
		margin-right: auto;
	}
	.rounded {
		border-radius: 0.3em 0.3em 0 0;
	}
	.title {
		font-family: 'Poppins', sans-serif;
		font-size: 20px;
		font-weight: 600;
		margin: 0em;
	}
	.message {
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		font-weight: 400;
		margin: 0.2em;
	}

	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		border-radius: 1em;
		padding: 2em;
	}
	.card:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
	.card:active {
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	.goto-card {
		height: 4em;
		width: 4em;
	}
	.notification-card {
		text-align: left;
		height: 5em;
		width: 16em;
	}
</style>
