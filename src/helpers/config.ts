import { CharacterAbility } from "../types/character";

export enum WeaponCategory {
  MeleeSimple = "MeleeSimple",
  MeleeArchaic = "MeleeArchaic",
  MeleeExotic = "MeleeExotic",
  RangedProjectile = "RangedProjectile",
  RangedEnergy = "RangedEnergy",
  RangedHeavy = "RangedHeavy",
  RangedOther = "RangedOther",
  RangedThrown = "RangedThrown",
}

export interface OwnConfig {
  abilities: Record<CharacterAbility, string>;
  actor: {};
  item: {
    weapon: {
      category: {
        indexedLabels: Record<WeaponCategory, string>;
        list: WeaponCategory[];
      };
    };
  };
}

export const OWN_CONFIG: Readonly<OwnConfig> = Object.freeze({
  abilities: Object.keys(CharacterAbility).reduce((acc, key) => {
    return { ...acc, [key]: CharacterAbility[key] };
  }, {} as OwnConfig["abilities"]),
  actor: {},
  item: {
    weapon: {
      category: {
        list: Object.values(WeaponCategory),
        indexedLabels: Object.keys(WeaponCategory).reduce((acc, key) => {
          return { ...acc, [key]: `OWN.item.weapon.category.option.${key}` };
        }, {} as OwnConfig["item"]["weapon"]["category"]["indexedLabels"]),
      },
    },
  },
});

export const REPO_NAME = "fvtt-mutants-and-masterminds-3e";
