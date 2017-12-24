(async () => {
	let hostname = "";
	try {
		let tab;
		if (window.browser) {
			tab = (await window.browser.tabs.query({active: true, currentWindow: true}))[0];
		} else if (window.chrome) {
			tab = (await new Promise((resolve) => {
				window.chrome.tabs.query({active: true, currentWindow: true}, resolve)
			}))[0];
		} else {
			console.log("Browser unsupported.");
		}
		// console.log(tab, browser, chrome)
		hostname = (new URL(tab.url)).hostname.replace("www.", "");
	} catch (err) {
		// Error parsing hostname
		console.log(err);
	}

	const frame = document.createElement("iframe");
	frame.src = "http://masterpassx.cretezy.com/generate/" + hostname;
	frame.width = "600px";
	frame.height = "350px";

	document.body.appendChild(frame);
})();