import { get } from "lodash-es";

import { REPO_NAME } from "../constants";

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 */
const preloadHandlebarsTemplates = async (): Promise<
  Handlebars.TemplateDelegate<any>[]
> => {
  return loadTemplates([
    // Item Sheet Partials
    `systems/${REPO_NAME}/templates/items/weapon.html`,
  ]);
};

type HandlebarsFoundryHelperName =
  | "checked"
  | "colorPicker"
  | "editor"
  | "filePicker"
  | "numberFormat"
  | "localize"
  | "radioBoxes"
  | "rangePicker"
  | "select"
  | "selectOptions"
  | "timeSince"
  | "eq"
  | "ne"
  | "lt"
  | "gt"
  | "lte"
  | "gte"
  | "and"
  | "or";

type HandlebarsOwnHelperName = "lodash.get";

const handlebarsHelperArgs: {
  name: Exclude<HandlebarsOwnHelperName, HandlebarsFoundryHelperName>;
  fn: Handlebars.HelperDelegate;
}[] = [
  {
    name: "lodash.get",
    fn: (
      dotSeparatedPath: string,
      options?: { data?: { root?: ItemSheet.Data<DocumentSheet.Options> } },
    ) => {
      const templateData = options?.data?.root ?? {};
      return get(templateData, dotSeparatedPath);
    },
  },
];

export { handlebarsHelperArgs, preloadHandlebarsTemplates };
