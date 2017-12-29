import React from "react";
import { Card } from "reactstrap";

export function AboutText() {
	return (
		<Card body className="text-center">
			<p>
				MasterPassX is free as in beer (no money) and as in freedom (open
				source). It is shared under the MIT license and can be{" "}
				<ExternalLink href="https://github.com/Cretezy/MasterPassX">
					viewed on Github
				</ExternalLink>{" "}
				with more information. It is based upon the original{" "}
				<ExternalLink href="http://masterpasswordapp.com">
					MasterPassword
				</ExternalLink>{" "}
				algorithm and idea.
			</p>
			<p>
				You can find extensions for MasterPassX for{" "}
				<ExternalLink href="https://addons.mozilla.org/en-US/firefox/addon/masterpassx/">
					Firefox
				</ExternalLink>{" "}
				and{" "}
				<ExternalLink href="https://chrome.google.com/webstore/detail/masterpassx/acocljodaoecblhjggkadfhnbjcfgbbb">
					Chrome
				</ExternalLink>.
			</p>
		</Card>
	);
}

function ExternalLink({ href, children }) {
	return (
		<a target="_blank" rel="noopener noreferrer" href={href}>
			{children}
		</a>
	);
}
