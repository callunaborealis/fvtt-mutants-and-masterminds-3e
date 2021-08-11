// Import document classes.
import { OwnActor } from "./documents/actor";
import { OwnItem } from "./documents/item";
// Import sheet classes.
import { OwnActorSheet } from "./sheets/actor-sheet";
import { OwnItemSheet } from "./sheets/item-sheet";
// Import helper/utility classes and constants.
import { OWN_CONFIG } from "./helpers/config";
import {
  handlebarsHelperArgs,
  preloadHandlebarsTemplates,
} from "./helpers/templates";

import type { OwnCONFIG, OwnGame } from "./types";

declare var game: OwnGame;
declare var CONFIG: OwnCONFIG;

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once("init", function () {
  console.log(`FVTT Mutants and Masterminds 3e | Initializing the Game System`);
  /**
   * Add utility classes to the global game object so that they're more easily
   * accessible in global contexts.
   *
   * This is for easier access to some of the classes
   * defined in our ES modules. These are useful for things like debugging in
   * your browser's console or letting modules interact with your system's classes.
   */
  game.own = {
    OwnActor,
    OwnItem,
  };

  /**
   *
   * Add custom constants for configuration.
   *
   * If you define constants for your system, such as in a config.js ES module,
   * you can add them to the global CONFIG object like in this example.
   */
  CONFIG.OWN = OWN_CONFIG;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20 + @abilities.dex.mod",
    decimals: 2,
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = OwnActor;
  CONFIG.Item.documentClass = OwnItem;

  // Register sheet application classes
  /**
   * Foundry defines a general ActorSheet and ItemSheet class by default,
   * so we need to unregister those sheets and instead register our own
   * sheet classes. You can register as many sheets as you like, and modules
   * can also register their own sheets.
   */
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("own", OwnActorSheet, {
    makeDefault: true,
  });
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

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", function () {
  // Include steps that need to happen after Foundry has fully loaded here.
});
