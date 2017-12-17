import React from 'react';
import {
	Button, Card, CardBody, CardImg, CardSubtitle, CardTitle
} from 'reactstrap';
import imageSocialMediaPhone from "../assets/images/social-media-phone.jpg";
import imageScreenGreenScaryText from "../assets/images/screen-green-scary-text.jpg";

export default class Welcome extends React.Component {
	render() {
		return (
			<CardBody className="text-center">
				<CardTitle>MasterPassX</CardTitle>
				<CardSubtitle>A deterministic stateless password generator.</CardSubtitle>

				<br/>

				<Card>
					<CardImg top width="100%" src={imageSocialMediaPhone}/>
					<CardBody>
						<CardTitle>Why Secure Passwords?</CardTitle>
						<div className="text-left">
							As the number of online services used by millions around the globe increase daily, password
							security is often an overlooked subject.
							<br/>
							With leaks of tens of <a href="https://techcrunch.com/2017/09/07/equifax-data-leak-could-involve-143-million-consumers/">hundreds millions of user’s data</a> (<a href="https://www.theverge.com/2017/10/3/16414306/yahoo-security-data-breach-3-billion-verizon">or even billions</a>), <a href="https://techcrunch.com/2017/11/27/imgur-says-1-7m-emails-and-passwords-were-breached-in-2014-hack/">including passwords (or hashs)</a>,
							users are reminded to never reuse passwords across difference services, but very few do.
							<hr/>
							A common solution is to use a password manager, however this introduces a new set of
							problems, to which MasterPassX solves each:
							<br/>
							<ul>
								<li>
									Users must setup and maintain their password managers across all devices they
									regularly use.
								</li>
								<ul>
									<li>
										MasterPassX is a <strong>web app that can be loaded anywhere</strong> (and works
										offline).
									</li>
								</ul>

								<hr/>

								<li>
									Users must setup syncing, which can be complicated, and relies on a third party
									which can be hacked, or which costs money.
								</li>
								<ul>
									<li>
										MasterPassX does not store or transfer any password or information, making
										it <strong>trustless</strong>.
									</li>
								</ul>

								<hr/>

								<li>
									They are not forced to use secure passwords, and often encourages password reuse,
									even with the option to generate safe and secure passwords built-in.
								</li>
								<ul>
									<li>
										MasterPassX only generates <strong>long, secure</strong> passwords by default.
									</li>
								</ul>
							</ul>
							<hr/>
							Imagine only having to remember a single master password, and having a secure (unique)
							password for each service, with near-zero setup. MasterPassX aims to do that.
						</div>
					</CardBody>
				</Card>
				<br/>
				<Card>
					<CardImg top width="100%" src={imageScreenGreenScaryText}/>
					<CardBody>
						<CardTitle>How Does MasterPassX Work?</CardTitle>
						<div className="text-left">
							MasterPassX aimed to fix this with an algorithm created for <a
							href="http://masterpasswordapp.com/">it's predecessor</a>, which relies on stateless
							generation.
							<br/>To summarize, this algorithm generates a unique cryptographic key based on your
							name, and a single master password (which the user must remember, and is encouraged to be
							secure and long in length). It then derives passwords based on this key and the service’s
							URL you are trying to access.
							<hr/>
							This ensures that all password generation is:
							<ul>
								<li>
									<strong>Client-side.</strong> No back-end, so no risk to ever intercept passwords or other data,
									making generation <strong>trustless</strong>.
								</li>
								<li>
									<strong>Deterministic.</strong> Using the same name, master, and URL, the generated
									password will
									always be the same across all devices, making it <strong>stateless</strong>.
								</li>
								<li>
									<strong>Secure.</strong> Passwords are long in length and high in entropy, with
									different templates such as
									“long” (default), PIN (4 digits), and so on.
								</li>
							</ul>
						</div>
					</CardBody>
				</Card>

				<br/>
				<Card>
					<CardBody>
						<CardTitle>Get Started Now</CardTitle>
						<div className="text-left">
							MasterPassX is free as in beer ($0) and as in freedom (open source).
							<br/>
							It is licensed under the MIT and can be view on Github (with more information).
						</div>
						<Button
							block size="lg" color="success"
							onClick={() => this.props.history.push('/add')}
						>
							Get Started With MasterPassX
						</Button>
					</CardBody>
				</Card>

				<hr/>


			</CardBody>
		);
	}
};
