/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Item Sheet Partials
    "systems/fvtt-mutants-and-masterminds-3e/templates/items/weapon.html",
  ]);
};
