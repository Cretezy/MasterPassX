import assert from 'assert';
import {createKey, createSeed, createPassword} from ".";

// Extremely basic tests. This is just to verify if it works and shows expected values.
(async () => {
	try {
		const key = await createKey("user", "password");
		assert.equal(key, "c89ecc86ff70a08a61ab19409168fd6b4f09ca2342c951c59427eb587092aff2822a284a74eaf4037d149306ef16386766c720b679722cc1fc78379000b417ee",
			"Key does not match.");

		const seed = createSeed(key, "example.com", 1);
		assert.equal(seed, "47926a80c3187d12fd53238c126d242d66cba9caba46290b8cf8305aa31b2696",
			"Seed does not match.");

		const password = createPassword(seed, "long");
		assert.equal(password, "ZedaFaxcZaso9*", "Password does not match.");
	} catch (err) {
		console.error("ERROR:", err.message, err.expected, err.operator, err.actual);
		return;
	}

	console.log("All test pass!")
})();