export enum Templates {
  Maximum = "maximum",
  Long = "long",
  Medium = "medium",
  Basic = "basic",
  Short = "short",
  Pin = "pin",
  Name = "name",
  Phrase = "phrase"
}

export const templateNames = {
  [Templates.Maximum]: "Maximum",
  [Templates.Long]: "Long",
  [Templates.Medium]: "Medium",
  [Templates.Basic]: "Basic",
  [Templates.Short]: "Short",
  [Templates.Pin]: "PIN",
  [Templates.Name]: "Name",
  [Templates.Phrase]: "Phrase"
};

export const templatesBase: { [template: string]: string[] } = {
  [Templates.Maximum]: ["anoxxxxxxxxxxxxxxxxx", "axxxxxxxxxxxxxxxxxno"],
  [Templates.Long]: [
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
  [Templates.Medium]: ["CvcnoCvc", "CvcCvcno"],
  [Templates.Basic]: ["aaanaaan", "aannaaan", "aaannaaa"],
  [Templates.Short]: ["Cvcn"],
  [Templates.Pin]: ["nnnn"],
  [Templates.Name]: ["cvccvcvcv"],
  [Templates.Phrase]: [
    "cvcc cvc cvccvcv cvc",
    "cvc cvccvcvcv cvcv",
    "cv cvccv cvc cvcvccv"
  ]
};

const baseV = "AEIOU";
const baseC = "BCDFGHJKLMNPQRSTVWXYZ";
const baseN = "0123456789";
const baseO = "@&%?,=[]_:-+*$#!'^~;()/.";

export const templateChars: { [key: string]: string } = {
  V: baseV,
  C: baseC,
  v: baseV.toLowerCase(),
  c: baseC.toLowerCase(),
  A: baseV + baseC,
  a: baseV + baseV.toLowerCase() + baseC + baseC.toLowerCase(),
  n: baseN,
  o: baseO,
  x:
    baseV +
    baseV.toLowerCase() +
    baseC +
    baseC.toLowerCase() +
    baseN +
    "!@#$%^&*()",
  " ": " "
};
