import scrypt from "scrypt-async-modern";
import { Buffer } from "buffer";
import * as CryptoJS from "crypto-js";
import { templateChars, templateNames, templatesBase } from "./templates";

function createNamespace(namespace) {
  return {
    createKey(name, master, { interruptStep = null } = {}) {
      let offset = 0;
      const buf = Buffer.alloc(
        namespace.length + 4 /* uint32 size */ + name.length
      );

      buf.write(namespace, offset);
      offset += namespace.length;

      buf.writeUInt32BE(name.length, offset);
      offset += 4;

      buf.write(name, offset);

      return scrypt(master, buf, {
        N: 32768,
        r: 8,
        p: 2,
        dkLen: 64,
        encoding: "hex",
        interruptStep
      });
    },

    createSeed(key, site, counter) {
      let offset = 0;
      const buf = new Buffer(
        namespace.length +
        4 /* uint32 size */ +
          site.length +
          4 /* uint32 size */
      );

      buf.write(namespace, offset);
      offset += namespace.length;

      buf.writeUInt32BE(site.length, offset);
      offset += 4;

      buf.write(site, offset);
      offset += site.length;

      buf.writeUInt32BE(counter, offset);

      return CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA256(
          CryptoJS.enc.Hex.parse(buf.toString("hex")),
          CryptoJS.enc.Hex.parse(key)
        )
      );
    },

    createPassword(seed, template) {
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
  };
}

const { createKey, createSeed, createPassword } = createNamespace(
  "com.lyndir.masterpassword"
);

export {
  createKey,
  createSeed,
  createPassword,
  createNamespace,
  templateNames as templates
};
