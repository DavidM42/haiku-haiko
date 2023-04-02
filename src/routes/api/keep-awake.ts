import { db } from '../../logic/Database';

/**
 * Keeping database awake to not get it to idle
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	const haiku = await db.createHaiku(
		'Das hier ist nur temp',
		'Sonst geht die Datenbank schlafen',
		'Gleich schon wieder weg'
	);
	if (haiku) {
		await new Promise((resolve) => setTimeout(resolve, 300));

		db.removeHaiku(haiku);
		return {
			body: 'Saved haiku and deleted it again'
		};
	}
}
