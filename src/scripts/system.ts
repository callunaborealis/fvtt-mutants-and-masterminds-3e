// Import document classes.
import { OwnActor } from "../documents/actor";
import { OwnItem } from "../documents/item";
// Import sheet classes.
import { OwnActorSheet } from "../sheets/actor-sheet";
import { OwnItemSheet } from "../sheets/item-sheet";
// Import helper/utility classes and constants.
import { CONFIG_OWN } from "../helpers/config";
import {
  handlebarsHelperArgs,
  preloadHandlebarsTemplates,
} from "../helpers/templates";

// Types
import type { OwnGame, OwnCONFIG } from "./types";

Hooks.once("init", function () {
  console.log(`FVTT Mutants and Masterminds 3e | Initializing the Game System`);
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  (game as OwnGame).own = {
    Actor: OwnActor,
    Item: OwnItem,
  };

  // Add custom constants for configuration.
  (CONFIG as OwnCONFIG).OWN = CONFIG_OWN;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  (CONFIG as OwnCONFIG).Combat.initiative = {
    formula: "1d20 + @abilities.dex.mod",
    decimals: 2,
  };

  // Define custom Document classes
  (CONFIG as OwnCONFIG).Actor.documentClass = OwnActor;
  (CONFIG as OwnCONFIG).Item.documentClass = OwnItem;

  // Register sheet application classes
  // Actors.unregisterSheet("core", ActorSheet);
  // Actors.registerSheet("own", OwnActorSheet, {
  //   makeDefault: true,
  // });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("own", OwnItemSheet, {
    makeDefault: true,
  });

  // Define custom Handlebars helpers
  handlebarsHelperArgs.forEach((handlebarHelperArgPair) => {
    Handlebars.registerHelper(
      handlebarHelperArgPair.name,
      handlebarHelperArgPair.fn,
    );
  });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});
