import { LIA_PAGINAS } from "../data/liaPages.js";

export function getLiaRef(text, kwestie) {
  if (!text) {
    const kwestieRefs = {
      0: null,
      1: "Lia 1, H1–H4",
      2: "Lia 1, H5–H7",
      3: "Lia 2, H8–H11",
      4: "Lia 2, H12–H14",
      "B1": "Lia 1",
      "C1": "Lia 1 & 2",
      "D1": "Lia 1",
      "E1": "Lia 2, H12",
    };
    return kwestieRefs[kwestie] || null;
  }
  for (const [key, ref] of Object.entries(LIA_PAGINAS)) {
    if (text.includes(key)) return ref;
  }
  return getLiaRef(null, kwestie);
}
