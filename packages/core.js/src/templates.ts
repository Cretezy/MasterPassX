export const templateNames = {
  maximum: "Maximum",
  long: "Long",
  medium: "Medium",
  basic: "Basic",
  short: "Short",
  pin: "PIN",
  name: "Name",
  phrase: "Phrase"
};

export const templatesBase = {
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

const baseV = "AEIOU";
const baseC = "BCDFGHJKLMNPQRSTVWXYZ";
const baseN = "0123456789";
const baseO = "@&%?,=[]_:-+*$#!'^~;()/.";

export const templateChars = {
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
