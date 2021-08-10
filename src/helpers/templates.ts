import { get } from "lodash-es";

import { OWN_CONFIG, REPO_NAME } from "./config";

const templateDirectory = {
  item: {
    weapon: `systems/${REPO_NAME}/templates/item/weapon.html`,
  },
};

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 */
const preloadHandlebarsTemplates = async (): Promise<
  Handlebars.TemplateDelegate<any>[]
> => {
  return loadTemplates([
    // Item Sheet Partials
    ...Object.values(templateDirectory.item),
  ]);
};

type HandlebarsNativeHelperName = "lookup";
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

/**
 * Format for helper names
 * `{external module package name}_{helper name in camel case}`
 */
type HandlebarsOwnHelperName = "lodash_get" | "own_getConfig" | "own_replace";

const handlebarsHelperArgs: {
  name: Exclude<
    HandlebarsOwnHelperName,
    HandlebarsFoundryHelperName | HandlebarsNativeHelperName
  >;
  fn: Handlebars.HelperDelegate;
}[] = [
  {
    name: "lodash_get",
    fn: (
      dotSeparatedPath: string,
      options?: { data?: { root?: ItemSheet.Data<ItemSheet.Options> } },
    ) => {
      const templateData = options?.data?.root ?? {};
      return get(templateData, dotSeparatedPath);
    },
  },
  {
    name: "own_getConfig",
    fn: (dotSeparatedPath: string) => {
      return get(OWN_CONFIG, dotSeparatedPath);
    },
  },
  {
    name: "own_replace",
    fn: (candidate: string, searchValue: string, replaceValue: string) => {
      return candidate.replace(searchValue, replaceValue);
    },
  },
];

export { handlebarsHelperArgs, preloadHandlebarsTemplates, templateDirectory };
