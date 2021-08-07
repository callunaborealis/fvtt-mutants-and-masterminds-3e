enum WeaponCategory {
  MeleeSimple = "MeleeSimple",
  MeleeArchaic = "MeleeArchaic",
  MeleeExotic = "MeleeExotic",
  RangedProjectile = "RangedProjectile",
  RangedEnergy = "RangedEnergy",
  RangedHeavy = "RangedHeavy",
  RangedOther = "RangedOther",
}

enum DamageEffectType {
  Bludgeoning = "Bludgeoning",
  Chemical = "Chemical",
  Piercing = "Piercing",
  Slashing = "Slashing",
}

/**
 * See Page 108.
 */
enum CharacterAbility {
  Strength = "STR",
  Stamina = "STA",
  Agility = "AGL",
  Dexterity = "DEX",
  Fighting = "FGT",
  Intellect = "INT",
  Awareness = "AWE",
  Presence = "PRE",
}

enum AdvantageCategory {
  Combat,
  Fortune,
  General,
  Skill,
}

enum EffectCategory {
  CloseVisualDazzle = "CloseVisualDazzle",
  Damage = "Damage",
}

interface DamageEffectShape {
  category: EffectCategory.Damage;
  attributes: {
    abilityUsed: CharacterAbility;
    type: DamageEffectType;
    value: number;
  };
}

enum CombatAdvantageId {
  AccurateAttack,
  AllOutAttack,
  ImprovedGrab,
  ImprovedTrip,
}
interface CombatAdvantageShape {
  category: AdvantageCategory.Combat;
  attributes: {
    id: CombatAdvantageId;
    name: string;
    description: string;
    effect: Record<string, DamageEffectShape>;
  };
}

interface WeaponAttributes {
  advantages: Record<string, CombatAdvantageShape>;
  /**
   * Melee weapons are categorized as simple, archaic,
   * and exotic.
   * See Page 217.
   */
  category: WeaponCategory;
  /**
   * Item sheet related CSS class assignment
   */
  classes: Record<string, string>;
  /**
   * The threat range for a critical hit with the weapon.
   * Some weapons have a larger threat range than others.
   * Increasing a weapon’s threat range by 1 costs 1 point, like
   * the Improved Critical advantage.
   * See Page 217.
   */
  critical: {
    min: number;
    max: number;
  };
  /**
   * This is the weapon’s cost in points. Characters pay
   * this cost from their equipment points to have a weapon of
   * this type as part of their regular equipment.
   * See Page 217.
   */
  cost: number;
  /**
   * The effect a hit with the weapon causes, typically
   * Damage, although some modern melee weapons have
   * other effects. The effect has the normal cost given in the
   * Powers chapter. The effect may also have certain descriptors,
   * such as bludgeoning or slashing, for defining things
   * like resistance or vulnerability to certain effects.
   * See Page 217.
   */
  effect: Record<string, DamageEffectShape>;
  reach: number;
}

// export type { WeaponAttributes };
