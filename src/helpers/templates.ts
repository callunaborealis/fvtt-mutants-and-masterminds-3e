import { REPO_NAME } from "../constants";

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 */
export const preloadHandlebarsTemplates = async (): Promise<
  Handlebars.TemplateDelegate<any>[]
> => {
  return loadTemplates([
    // Item Sheet Partials
    `systems/${REPO_NAME}/templates/items/weapon.html`,
  ]);
};
