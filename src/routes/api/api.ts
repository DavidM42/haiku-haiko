// import db from '$lib/database';

// hCaptcha to secure haiku creation and report button
// https://docs.hcaptcha.com/#add-the-hcaptcha-widget-to-your-webpage

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { slug } = params;

	// const article = await db.get(slug);
    const article = "test";

	if (article) {
		return {
			body: {
				article
			}
		};
	}
}