<script lang="ts">
	import {
		ShoppingBagIcon,
		ShoppingCartIcon,
		MicIcon,
		SearchIcon,
		XIcon,
	} from 'svelte-feather-icons'

	import ProductList from '../components/product-list.svelte'
	import CategoryList from '../components/category-list.svelte'
	import VoiceInput from '../components/voice-input.svelte'

	import { go as fuzzySearch } from 'fuzzysort'
	import { nanoid as generateId } from 'nanoid'

	import type { Product } from '../types'

	// NOTE: Hardcoded
	const categories = [
		{
			id: 'tH151Sj@m',
			name: 'Jams',
			image: '/images/categories/jams.png',
			relatedCategories: [],
		},
		{
			id: 'tH151Sn00dl3',
			name: 'Noodles',
			image: '/images/categories/noodles.png',
			relatedCategories: [],
		},
	]
	const products = [
		{
			id: 'k155@Nm1X3dFry1tJ@M',
			name: 'Kissan Mixed Fruit Jam',
			description:
				'Kissan Mixed Fruit Jam is a delicious blend of 8 different fruits Pineapple, Orange, Apple, Grape, Mango, Pear, Papaya, and Banana.',
			image: '/images/products/kissan-mixed-fruit-jam.png',
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
			payment: ['upi', 'cash'],
			channel: 'online',
			relatedProducts: [],
		},
	]

	// View state that control which view is shown
	const view = {
		title: 'Catalog',
		focus: 'categories', // categories | search | create-product
		state: {},
	}

	/**
	 * Filter the list of products based on the selected category.
	 *
	 * @param {string} categoryId - The selected category's ID.
	 */
	const filterProductsByCategory = (categoryId: string) => {
		view.state.category = categoryId
		view.state.products = products.filter(
			(product) => product.category === categoryId,
		)
	}

	/**
	 * Update a product in the list.
	 *
	 * @param {Product} updatedProduct - The updated version of the product. The product ID should never be updated and may be used to find the existing product.
	 */
	const updateProduct = (updatedProduct: Product) => {
		const productIndex = products.findIndex(
			(product) => product.id === productId,
		)
		products[productIndex].inventory += 1

		// Re-render the list of products
		filterProductsByCategory(updatedProduct.category)
	}

	/**
	 * Show the voice search panel.
	 */
	const showVoiceSearchPanel = () => {
		view.focus = 'search'
		view.title = 'Search'
		view.state = {
			isListening: false,
			error: undefined,
			recognizedText: undefined,
		}
	}

	/**
	 * Hide the voice search panel.
	 */
	const hideVoiceSearchPanel = () => {
		view.focus = 'categories'
		view.title = 'Catalog'
		view.state = {}
	}

	/**
	 * Callback fired when we receive the results of speech recognition.
	 */
	const onSpeechRecognition = (error?: Error, text?: string) => {
		view.state.products = []

		// If there is an error, display it and return
		if (error) {
			view.state.error =
				'An error occurred while recognizing voice input. Have you given this app permission to access your microphone?'
			return
		}

		// If we recognize any text, search the list of products for a matching name
		view.state.recognizedText = text
		view.state.products = fuzzySearch(view.state.recognizedText, products, {
			key: 'name',
		}).map((result) => result.obj)
	}
</script>

<main>
	<!-- The page title -->
	<h1 class="rounded">{view.title}</h1>

	<!-- The main content on the page is in this table -->
	<table class="center">
		<tr>
			<table style="width: 100%">
				{#if view.focus === 'search'}
					<!-- This part is only shown if the user presses the 'Product Search' button -->
					<tr>
						<!-- The voice input component takes a list of words and returns the recognized text on its own -->
						<VoiceInput
							wordList={products.map((product) => product.name)}
							onInput={onSpeechRecognition}
						/>
					</tr>
					<tr>
						<!-- If there is any error while listening for voice input, show it here -->
						{#if view.state.error}
							<p class="message error">{view.state.error}</p>
						{/if}
						<!-- Once the voice input has been converted to text, show a 'Searching...' message -->
						{#if view.state.recognizedText}
							<p class="message">
								Searching for products matching '{view.state.recognizedText}'
							</p>
						{/if}
					</tr>
				{:else}
					<!-- By default, the first row is a carousel of product categories -->
					<tr>
						<span class="title left-align"> Categories </span>
						<CategoryList {categories} onSelect={filterProductsByCategory} />
					</tr>
				{/if}
			</table>
		</tr>

		<!-- Show a list of products (either based on the category selected or the search query entered) -->
		<tr>
			<table style="width: 100%">
				<td>
					<span class="title left-align"> Products </span>
				</td>
				<td>
					{#if view.focus === 'search'}
						<!-- Show a close icon if the search panel is in focus -->
						<div class="title right-align" on:click={hideVoiceSearchPanel}>
							<XIcon size="24" />
						</div>
					{:else}
						<!-- Show a search icon if the search panel isn't in focus -->
						<div class="title right-align" on:click={showVoiceSearchPanel}>
							<SearchIcon size="24" />
						</div>
					{/if}
				</td>
			</table>
			<!-- The list of filtered products -->
			<ProductList products={view.state.products} />
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
		margin-top: 10%;
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
	.error {
		color: 'red';
	}
</style>
