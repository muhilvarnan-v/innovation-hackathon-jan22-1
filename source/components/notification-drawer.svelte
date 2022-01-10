<script lang="ts">
	import type Notification from '../types'

	/**
	 * A list of notifications. To be passed in as a prop to the `NotificationDrawer`
	 * component.
	 */
	export let notifications: Notification[]
</script>

<template>
	{#if notifications}
		<div id="notification-drawer" class="drawer">
			{#each notifications as notification}
				<div class="card notification-card">
					<h4 class="title">{notification.title}</h4>
					<span class="message">{notification.description}</span>
				</div>
			{/each}
		</div>
	{/if}
</template>

<style>
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

	.notification-card {
		text-align: left;
		height: 5em;
		width: 16em;
		margin: 0.4em;
	}
</style>
