// import db from '$lib/database';

// hCaptcha to secure haiku creation and report button
// https://docs.hcaptcha.com/#add-the-hcaptcha-widget-to-your-webpage

import { db } from '../../logic/Database';


/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post(req) {
	const values = JSON.parse(req.body);

	const haiku = await db.createHaiku(values.lineOne, values.lineTwo, values.lineThree);
	if (haiku) {
		return {
			body: haiku
		};
	}
}