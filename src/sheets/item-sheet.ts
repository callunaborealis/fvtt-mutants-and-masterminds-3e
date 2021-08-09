import { templateDirectory } from "../helpers/templates";

import styles from "../styles/templates/item/weapon.scss";

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class OwnItemSheet extends ItemSheet {
  get template() {
    return templateDirectory.item.weapon;
  }

  /** @override */
  getData() {
    const data = super.getData() as ItemSheet.Data<ItemSheet.Options>;
    const ownData = {
      ...data,
      cssClass: styles["item-sheet"],
      editable: true,
      data: {
        ...data.data,
        data: {
          ...data.data.data,
          classes: {
            header: styles["item-sheet__header"],
            headerTop: styles["item-sheet__header-top"],
            attributes: styles["item-sheet__attributes"],
            tabs: styles["item-sheet__tabs"],
            tab: styles["item-sheet__tab"],
            tabContent: styles["item-sheet__tab-content"],
          },
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

    const tabs = html[0].querySelectorAll(
      `.${styles["item-sheet__tab"]}[data-tab][data-selected]`,
    );

    // Set up tab toggling
    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const tabType = (e.target as HTMLElement)?.dataset?.tab;
        const toggleableAreas = html[0].querySelectorAll(
          `.${styles["item-sheet__tab-content"]}[data-tab][data-selected]`,
        );
        toggleableAreas.forEach((toggleableArea) => {
          (
            (toggleableArea as HTMLElement).dataset as { selected: string }
          ).selected =
            ((toggleableArea as HTMLElement).dataset as { tab: string }).tab ===
            tabType
              ? "true"
              : "false";
        });
        // Switch active tab presentation
        tabs.forEach((tab) => {
          ((tab as HTMLElement).dataset as { selected: string }).selected =
            ((tab as HTMLElement).dataset as { tab: string }).tab === tabType
              ? "true"
              : "false";
        });
      });
    });

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Roll handlers, click handlers, etc. would go here.
  }
}
