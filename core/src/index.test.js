import { createKey, createSeed, createPassword } from "./index";

describe("MasterPassX", () => {
	let key;
	let seed;
	let password;

	it("should generate key", async () => {
		key = await createKey("user", "password");
		expect(key).toBe(
			"c89ecc86ff70a08a61ab19409168fd6b4f09ca2342c951c59427eb587092aff2822a284a74eaf4037d149306ef16386766c720b679722cc1fc78379000b417ee"
		);
	});

	it("should generate seed", () => {
		seed = createSeed(key, "example.com", 1);
		expect(seed).toBe(
			"47926a80c3187d12fd53238c126d242d66cba9caba46290b8cf8305aa31b2696"
		);
	});

	it("should generate master (long)", () => {
		password = createPassword(seed, "long");
		expect(password).toBe("ZedaFaxcZaso9*");
	});

	it("should generate master (maximum)", () => {
		password = createPassword(seed, "maximum");
		expect(password).toBe("pf4zS1LjCg&LjhsZ7T2~");
	});
});
