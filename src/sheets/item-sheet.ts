import { templateDirectory } from "../helpers/templates";

import styles from "../styles/templates/item/weapon.scss";

interface DataShape {
  classes: typeof styles;
}

type ItemSheetTab = "description" | "details" | "effects";

type OwnItemSheetData = ItemSheet.Data<ItemSheet.Options> & {
  data: DataShape;
};

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class OwnItemSheet extends ItemSheet<
  ItemSheet.Options,
  OwnItemSheetData
> {
  get template() {
    return templateDirectory.item.weapon;
  }

  /** @override */
  getData() {
    const data = super.getData() as OwnItemSheetData;
    const ownData: OwnItemSheetData = {
      ...data,
      cssClass: styles["item-sheet"],
      editable: true,
      data: {
        ...data.data,
        classes: {
          attributes: styles["attributes"],
          attributesSourceLink: styles["attributes__source__link"],
          attributesSourceText: styles["attributes__source__text"],
          description: styles["description"],
          detailsForm: styles["details-form"],
          detailsFormLabel: styles["details-form__label"],
          detailsFormRangeField: styles["details-form__range-field"],
          detailsFormNumField: styles["details-form__num-field"],
          header: styles["header"],
          headerTop: styles["header-top"],
          tabs: styles["item-sheet__tabs"],
          tab: styles["item-sheet__tab"],
          tabContent: styles["tab-content"],
        },
      },
    };
    return ownData;
  }

  /** @override This is a small override to handle remembering the sheet's position. */
  setPosition(options = {}) {
    const position = super.setPosition(options);
    const sheetBody = this.element.find(".sheet-body");
    const bodyHeight = (position?.height ?? 0) - 192;
    sheetBody.css("height", bodyHeight);
    return position;
  }

  /** @override */
  activateListeners(html: JQuery) {
    super.activateListeners(html);

    type ItemSheetTabEl = HTMLElement & {
      readonly dataset: DOMStringMap & {
        selected: "true" | "false";
        tab: ItemSheetTab;
      };
    };

    const tabs = html[0].querySelectorAll<ItemSheetTabEl>(
      `.${styles["item-sheet__tab"]}[data-tab][data-selected]`,
    );

    // Set up tab toggling
    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const tabType = (e.target as ItemSheetTabEl).dataset.tab;
        const toggleableAreas = html[0].querySelectorAll<ItemSheetTabEl>(
          `.${styles["tab-content"]}[data-tab][data-selected]`,
        );
        toggleableAreas.forEach((toggleableArea) => {
          if (toggleableArea.dataset.tab === tabType) {
            this.item.update({
              "data.sheet.selectedTab": toggleableArea.dataset.tab,
            });
          }
        });
      });
    });

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Roll handlers, click handlers, etc. would go here.
  }
}
