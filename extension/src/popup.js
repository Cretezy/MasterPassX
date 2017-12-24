(async () => {
	let hostname = "";
	try {
		const tab = (await browser.tabs.query({active: true, currentWindow:true}))[0];
		hostname = (new URL(tab.url)).hostname.replace("www.", "");
	} catch (e) {
		// Error parsing hostname
	}

	const frame = document.createElement("iframe");
	frame.src = "http://masterpassx.cretezy.com/generate/" + hostname;
	frame.width = "600px";
	frame.height = "350px";

	document.body.appendChild(frame);
})();