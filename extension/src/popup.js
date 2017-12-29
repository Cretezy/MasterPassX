(async () => {
	try {
		let tab;
		if (window.browser) {
			// Firefox
			tab = (await window.browser.tabs.query({active: true, currentWindow: true}))[0];
		} else if (window.chrome) {
			// Chrome
			tab = (await new Promise((resolve) => {
				window.chrome.tabs.query({active: true, currentWindow: true}, resolve)
			}))[0];
		} else {
			throw new Error("Browser unsupported")
		}

		// Grab hostname without www.
		const hostname = (new URL(tab.url)).hostname.replace("www.", "");

		// If Firefox android, full screen
		let windowed = true;
		if (window.browser) {
			const {os} = await window.browser.runtime.getPlatformInfo();
			if (os === "android") {
				windowed = false;
			}
		}

		const frame = document.createElement("iframe");
		frame.src = "https://masterpassx.cretezy.com/generate/" + hostname;

		if (windowed) {
			frame.style.width = "600px";
			frame.style.height = "350px";
		} else {
			frame.style.width = "100vw";
			frame.style.height = "100vh";
		}

		document.body.appendChild(frame);
	} catch (err) {
		console.log(err);
	}
})();