import logoAsset from "@/assets/logo.png.asset.json";
import alien from "@/assets/alien.png";
import rocket from "@/assets/rocket.png";
import flores from "@/assets/cat-flores.png";
import prerolls from "@/assets/cat-prerolls.png";
import concentrados from "@/assets/cat-concentrados.png";
import edibles from "@/assets/cat-edibles.png";
import accesorios from "@/assets/cat-accesorios.png";

export const LOGO_URL = logoAsset.url;

export const ART = {
  alien,
  rocket,
  flores,
  prerolls,
  concentrados,
  edibles,
  accesorios,
} as const;

export type ArtKey = keyof typeof ART;

export function art(key?: string | null, fallback: ArtKey = "flores") {
  if (key && key in ART) return ART[key as ArtKey];
  return ART[fallback];
}

export const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export const money = (value: number | string | null | undefined) =>
  COP.format(Number(value ?? 0)).replace("COP", "").trim();
