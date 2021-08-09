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

export const REPO_NAME = "fvtt-mutants-and-masterminds-3e";
interface OwnConstantsShape {
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

export default Object.freeze({
  actor: {},
  item: {
    weapon: {
      category: {
        list: Object.values(WeaponCategory),
        indexedLabels: Object.keys(WeaponCategory).reduce((acc, key) => {
          return { ...acc, [key]: `OWN.item.weapon.category.option.${key}` };
        }, {} as OwnConstantsShape["item"]["weapon"]["category"]["indexedLabels"]),
      },
    },
  },
} as OwnConstantsShape);
