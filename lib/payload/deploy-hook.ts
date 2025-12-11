/**
 * Triggers a Vercel deploy hook to rebuild the site after CMS content changes.
 *
 * This function is called from Payload collection/global afterChange hooks.
 * In development, the hook URL is typically not set, so rebuilds are skipped.
 * In production, the hook triggers a new deployment on Vercel.
 */
export async function triggerDeployHook(): Promise<void> {
	const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

	if (!hookUrl) {
		console.log(
			"[Deploy Hook] Skipping - VERCEL_DEPLOY_HOOK_URL not configured",
		);
		return;
	}

	try {
		const response = await fetch(hookUrl, { method: "POST" });

		if (response.ok) {
			console.log("[Deploy Hook] Successfully triggered rebuild");
		} else {
			console.error(
				`[Deploy Hook] Failed to trigger rebuild: ${response.status} ${response.statusText}`,
			);
		}
	} catch (error) {
		console.error("[Deploy Hook] Error triggering rebuild:", error);
	}
}
