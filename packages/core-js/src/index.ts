import scrypt from "scrypt-async-modern";
import { Buffer } from "buffer";
import * as CryptoJS from "crypto-js";
import {
  templateChars,
  templateNames,
  Templates,
  templatesBase
} from "./templates";

export interface ICreateKeyOptions {
  interruptStep?: number;
}

export function createNamespace(namespace: string) {
  return {
    async createKey(
      name: string,
      master: string,
      { interruptStep }: ICreateKeyOptions = {}
    ) {
      let offset = 0;
      const buf = Buffer.alloc(
        namespace.length + 4 /* uint32 size */ + name.length
      );

      buf.write(namespace, offset);
      offset += namespace.length;

      buf.writeUInt32BE(name.length, offset);
      offset += 4;

      buf.write(name, offset);

      return await scrypt(master, buf, {
        N: 32768,
        r: 8,
        p: 2,
        dkLen: 64,
        encoding: "hex",
        interruptStep
      });
    },

    createSeed(key: string, site: string, counter: number) {
      let offset = 0;
      const buf = Buffer.alloc(
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

    createPassword(seed: string, template: Templates) {
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

export const { createKey, createSeed, createPassword } = createNamespace(
  "com.lyndir.masterpassword"
);

export { templateNames, Templates };
