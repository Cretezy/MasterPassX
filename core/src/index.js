import scrypt from "scrypt-async";
import crypto from "crypto-js";
import { Buffer } from "buffer";

const namespace = "com.lyndir.masterpassword";

const templatesBase = {
	maximum: ["anoxxxxxxxxxxxxxxxxx", "axxxxxxxxxxxxxxxxxno"],
	long: [
		"CvcvnoCvcvCvcv",
		"CvcvCvcvnoCvcv",
		"CvcvCvcvCvcvno",
		"CvccnoCvcvCvcv",
		"CvccCvcvnoCvcv",
		"CvccCvcvCvcvno",
		"CvcvnoCvccCvcv",
		"CvcvCvccnoCvcv",
		"CvcvCvccCvcvno",
		"CvcvnoCvcvCvcc",
		"CvcvCvcvnoCvcc",
		"CvcvCvcvCvccno",
		"CvccnoCvccCvcv",
		"CvccCvccnoCvcv",
		"CvccCvccCvcvno",
		"CvcvnoCvccCvcc",
		"CvcvCvccnoCvcc",
		"CvcvCvccCvccno",
		"CvccnoCvcvCvcc",
		"CvccCvcvnoCvcc",
		"CvccCvcvCvccno"
	],
	medium: ["CvcnoCvc", "CvcCvcno"],
	basic: ["aaanaaan", "aannaaan", "aaannaaa"],
	short: ["Cvcn"],
	pin: ["nnnn"],
	name: ["cvccvcvcv"],
	phrase: ["cvcc cvc cvccvcv cvc", "cvc cvccvcvcv cvcv", "cv cvccv cvc cvcvccv"]
};

const templateNames = {
	maximum: "Maximum",
	long: "Long",
	medium: "Medium",
	basic: "Basic",
	short: "Short",
	pin: "PIN",
	name: "Name",
	phrase: "Phrase"
};

const baseV = "AEIOU";
const baseC = "BCDFGHJKLMNPQRSTVWXYZ";
const baseN = "0123456789";
const baseO = "@&%?,=[]_:-+*$#!'^~;()/.";
const templateChars = {
	V: baseV,
	C: baseC,
	v: baseV.toLowerCase(),
	c: baseC.toLowerCase(),
	A: baseV + baseC,
	a: baseV + baseV.toLowerCase() + baseC + baseC.toLowerCase(),
	n: baseN,
	o: baseO,
	x: baseV + baseV.toLowerCase() + baseC + baseC.toLowerCase() + baseN + baseO,
	" ": " "
};

function createKey(name, master) {
	let offset = 0;
	const buf = new Buffer(namespace.length + 4 /* uint32 size */ + name.length);

	buf.write(namespace, offset);
	offset += namespace.length;

	buf.writeUInt32BE(name.length, offset);
	offset += 4;

	buf.write(name, offset);

	return new Promise(resolve => {
		scrypt(
			master,
			buf,
			{
				N: 32768,
				r: 8,
				p: 2,
				dkLen: 64,
				encoding: "hex"
			},
			resolve
		);
	});
}

function createSeed(key, site, counter) {
	let offset = 0;
	const buf = new Buffer(
		namespace.length + 4 /* uint32 size */ + site.length + 4 /* uint32 size */
	);

	buf.write(namespace, offset);
	offset += namespace.length;

	buf.writeUInt32BE(site.length, offset);
	offset += 4;

	buf.write(site, offset);
	offset += site.length;

	buf.writeUInt32BE(counter, offset);

	return crypto.enc.Hex.stringify(
		crypto.HmacSHA256(
			crypto.enc.Hex.parse(buf.toString("hex")),
			crypto.enc.Hex.parse(key)
		)
	);
}

function createPassword(seed, template) {
	const buf = Buffer.from(seed, "hex");

	const templates = templatesBase[template];
	const templateBase = templates[buf.readUInt8(0) % templates.length];

	return templateBase
		.split("")
		.map((templateChar, index) => {
			const chars = templateChars[templateChar];
			return chars[buf.readUInt8(index + 1) % chars.length];
		})
		.join("");
}

export { createKey, createSeed, createPassword, templateNames as templates };
