<script lang="ts">
	import Carousel from 'svelte-carousel'
	import {
		ShoppingBagIcon,
		ShoppingCartIcon,
		PlusIcon,
		MinusIcon,
		MicIcon,
		SearchIcon,
	} from 'svelte-feather-icons'
	import FuzzySearch from 'fuzzysort'
	import { nanoid as generateId } from 'nanoid'

	import SpeechToTextHelper from '../util/stt-helper'

	const allCategories = [
		{
			id: 'tH151Sj@m',
			name: 'Jams',
			image: '/images/categories/jams.png',
		},
		{
			id: 'tH151Sn00dl3',
			name: 'Noodles',
			image: '/images/categories/noodles.png',
		},
	]
	const allProducts = [
		{
			id: 'k155@Nm1X3dFry1tJ@M',
			name: 'Kissan Mixed Fruit Jam',
			description:
				'Kissan Mixed Fruit Jam is a delicious blend of 8 different fruits Pineapple, Orange, Apple, Grape, Mango, Pear, Papaya, and Banana.',
			image: {
				thumbnail: '/images/products/kissan-mixed-fruit-jam.thumbnail.png',
				fullsize: '/images/products/kissan-mixed-fruit-jam.fullsize.png',
			},
			category: 'tH151Sj@m',
			quantity: {
				magnitude: 500,
				unit: 'grams',
			},
			price: {
				amount: 144.15,
				currency: 'INR',
			},
			inventory: 3,
			payment: ['upi', 'cash', 'credit-card', 'debit-card', 'neft'],
			channel: 'online',
		},
	]

	let carousel
	let category = undefined
	let products = undefined

	let title = 'Catalog'
	let recognizedText = ''
	let productToCreate = {
		id: '',
		name: '',
		description: '',
		image: {
			thumbnail: '',
			fullsize: '',
		},
		category: '',
		quantity: {
			magnitude: 0,
			unit: '',
		},
		price: {
			amount: 0,
			currency: '',
		},
		inventory: 0,
		channel: '',
	}

	let shouldShowCreateItemView = false
	let shouldShowVoiceSearch = false
	let isListeningForVoiceInput = false

	const filterProductsByCategory = (categoryId: string) => {
		carousel.goTo(
			allCategories.findIndex((category) => category.id === categoryId),
		)

		category = categoryId
		products = allProducts.filter((product) => product.category === categoryId)
	}
	const incrementInventory = (productId: string) => {
		const productIndex = allProducts.findIndex(
			(product) => product.id === productId,
		)
		allProducts[productIndex].inventory += 1

		filterProductsByCategory(allProducts[productIndex].category)
	}
	const decrementInventory = (productId: string) => {
		const productIndex = allProducts.findIndex(
			(product) => product.id === productId,
		)
		allProducts[productIndex].inventory -= 1

		filterProductsByCategory(allProducts[productIndex].category)
	}
	const showVoiceSearch = () => {
		shouldShowCreateItemView = false
		shouldShowVoiceSearch = true
		title = 'Search'
	}
	const showCreateItemView = () => {
		shouldShowVoiceSearch = false
		shouldShowCreateItemView = true
		title = 'Create Item'
	}
	const startVoiceSearch = () => {
		const productNames = allProducts.map((product) => product.name)
		const grammar =
			'#JSGF V1.0; grammar names; public <name> = ' +
			productNames.join(' | ') +
			' ;'

		let speechToTextHelper
		try {
			speechToTextHelper = new SpeechToTextHelper(grammar)

			isListeningForVoiceInput = true
			console.log(isListeningForVoiceInput)

			speechToTextHelper.start((error?: Error, text?: string) => {
				if (error) {
					products = []
					recognizedText = 'Error'

					return
				}

				isListeningForVoiceInput = false
				recognizedText = text

				products = FuzzySearch.go(recognizedText, products, {
					key: 'name',
				}).map((result) => result.obj)

				if (products.length < 1) prefilledProductName = recognizedText
			})
		} catch {
			console.log(
				'STT unsupported on anything except Chrome Desktop and Android',
			)
		}
	}
	const createProductFromInput = () => {
		productToCreate.id = generateId()
		productToCreate.quantity.unit = 'grams'
		productToCreate.price.currency = 'INR'

		allProducts.push(productToCreate)
	}
</script>

<main>
	<h1 class="rounded">{title}</h1>

	<table class="center">
		<tr>
			{#if shouldShowVoiceSearch}
				{#if isListeningForVoiceInput}
					<div>
						<img
							style="height: 4em; width: 4em"
							class="center"
							src="/gifs/sound.gif"
							alt="Listening..."
						/>
					</div>
				{:else}
					<div on:click={startVoiceSearch}>
						<MicIcon size="42" />
					</div>
				{/if}
				<br />
				{#if recognizedText}
					<p>Searching for product: {recognizedText}</p>
				{/if}
			{:else if shouldShowCreateItemView}
				<div class="input-box center center-vertical">
					<label for="item-name-input">Name</label>
					<input
						id="item-name-input"
						type="text"
						value={productToCreate.name}
					/>
					<label for="item-desc-input">Description</label>
					<input
						id="item-desc-input"
						type="text"
						value={productToCreate.description}
					/>
					<label for="item-price-input">Price</label>
					<input
						id="item-price-input"
						type="number"
						value={productToCreate.price.amount}
					/>
					<label for="item-quantity-input">Quantity</label>
					<input
						id="item-quantity-input"
						type="number"
						value={productToCreate.quantity.magnitude}
					/>
					<label for="item-stock-input">Available Inventory</label>
					<input
						id="item-stock-input"
						type="number"
						value={productToCreate.inventory}
					/>
					<label for="item-channel-input">Available Inventory</label>
					<select name="cars" id="cars">
						<option
							value="online"
							on:click={() => (productToCreate.channel = 'online')}
							>Home delivery</option
						>
						<option
							value="offline"
							on:click={() => (productToCreate.channel = 'offline')}
							>Pick-up from store</option
						>
					</select>
					<div on:click={createProductFromInput}><span>Create Item</span></div>
				</div>
			{:else}
				<td>
					<span class="title left-align"> Categories </span>
					<div class="carousel">
						<Carousel
							id="catalog-carousel"
							class="center"
							particlesToShow={2}
							bind:this={carousel}
						>
							{#each allCategories as category}
								<div class="card category-card">
									<table
										class="center"
										on:click={() => filterProductsByCategory(category.id)}
									>
										<tr>
											<img src={category.image} alt={category.name} />
										</tr>
										<tr>
											<span class="title">{category.name}</span>
										</tr>
									</table>
								</div>
							{/each}
						</Carousel>
					</div>
				</td>
			{/if}
		</tr>
		<tr>
			{#if shouldShowCreateItemView}
				<div />
			{:else if products === undefined}
				<span class="message"> Select a category to view its products </span>
			{:else if products.length < 1 && !recognizedText}
				<span class="message">
					That category does not have any products yet
				</span>
			{:else if products.length < 1 && recognizedText}
				<div class="message" on:click={showCreateItemView}>
					Could not find a product with that name. Click this message to add a
					new product with that name.
				</div>
			{:else}
				<table style="width: 100%">
					<td>
						<span class="title left-align">Products</span>
					</td>
					<td>
						<div class="title right-align" on:click={showCreateItemView}>
							<PlusIcon size="24" />
						</div>
						<div class="title right-align" on:click={showVoiceSearch}>
							<SearchIcon size="24" />
						</div>
					</td>
				</table>

				<div class="items">
					{#each products as product}
						<div>
							<table class="center">
								<tr>
									<table>
										<tr>
											<td class="center-vertical">
												<img
													class="center-vertical left-align"
													src={product.image.thumbnail}
													alt={product.name}
												/>
											</td>
											<td colspan="2">
												<span class="title left-align">
													{product.name}
												</span>
											</td>
										</tr>
										<tr>
											<td>
												<span class="message left-align">
													{product.quantity.magnitude}
													{product.quantity.unit}
												</span>
											</td>
											<td>
												<span class="message left-align">
													{product.price.currency}
													{product.price.amount}
												</span>
											</td>
											<td>
												<div
													style="display: inline-block"
													on:click={() => decrementInventory(product.id)}
												>
													<MinusIcon size="24" />
												</div>
												<span
													style="display: inline-block"
													class="message left-align"
												>
													{product.inventory}
												</span>
												<div
													style="display: inline-block"
													on:click={() => incrementInventory(product.id)}
												>
													<PlusIcon size="24" />
												</div>
											</td>
										</tr>
									</table>
								</tr>
							</table>
						</div>
					{/each}
				</div>
			{/if}
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
		padding: 0.5em;
		margin-top: -0.05em;
	}

	table {
		border-collapse: separate;
		border-spacing: 2em 0;
	}

	input[type='text'] {
		display: block;
		border: none;
		border-bottom: 2px solid #1f2633;
	}
	label {
		display: block;
	}

	.center {
		margin-left: auto;
		margin-right: auto;
		align-items: center;
		justify-content: center;
		top: 50%;
		left: 50%;
		max-width: 100%;
		max-height: 100%;
		overflow: auto;
		padding: 2em;
		padding-left: 1.1em;
	}
	.center-vertical {
		display: inline-block;
		vertical-align: middle;
		margin-right: 0.5em;
	}
	.left-align {
		display: block;
		text-align: left;
	}
	.right-align {
		display: block;
		text-align: right;
	}
	.rounded {
		border-radius: 0.3em 0.3em 0 0;
	}
	.title {
		font-family: 'Poppins', sans-serif;
		font-size: 20px;
		font-weight: 600;
		margin: 0.2em;
	}
	.message {
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		font-weight: 400;
		margin: 0.2em;
	}

	.input-box {
		display: block;
		float: left;
	}

	.card {
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		border-radius: 1em;
		padding: 0.2em;
	}
	.card:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
	.card:active {
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	.category-card {
		height: 12em;
		width: 4em;
		max-height: 12em;
		margin: 0.5em 2em;
	}

	.carousel {
		overflow: auto;
		max-width: 26em;
		margin: 2em;
	}
</style>
