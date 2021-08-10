enum WeaponCategory {
  MeleeSimple = "MeleeSimple",
  MeleeArchaic = "MeleeArchaic",
  MeleeExotic = "MeleeExotic",
  RangedProjectile = "RangedProjectile",
  RangedEnergy = "RangedEnergy",
  RangedHeavy = "RangedHeavy",
  RangedOther = "RangedOther",
  RangedThrown = "RangedThrown",
}

interface OwnConfig {
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

const OWN_CONFIG: Readonly<OwnConfig> = Object.freeze({
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

const REPO_NAME = "fvtt-mutants-and-masterminds-3e";

export { OWN_CONFIG, REPO_NAME };
