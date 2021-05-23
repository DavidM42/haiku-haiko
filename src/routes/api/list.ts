// import db from '$lib/database';

// hCaptcha to secure haiku creation and report button
// https://docs.hcaptcha.com/#add-the-hcaptcha-widget-to-your-webpage

import { db } from '../../logic/Database';

const LIMIT_QUERY = 'limit';
const DEFAULT_LIMIT = 50;
const MAX_ALLOWED_LIMIT = 100;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(req) {
	// TODO query param for flipped order needed?
	const queryParams: URLSearchParams = req.query; 

	let limit = DEFAULT_LIMIT;
	if (queryParams.has(LIMIT_QUERY)) {
		const wantedLimit = Number.parseInt(queryParams.get(LIMIT_QUERY));
		if (wantedLimit > 0 && wantedLimit <= MAX_ALLOWED_LIMIT) {
			limit = wantedLimit;
		} else {
			throw new Error('Invalid limit given as query parameter');
		}
	}

	const haikus = await db.getHaikusByDate(limit);
	if (haikus) {
		return {
			body: haikus
		};
	}
}