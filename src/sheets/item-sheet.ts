import { REPO_NAME } from "../constants";

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class OwnItemSheet extends ItemSheet {
  get template() {
    return `systems/${REPO_NAME}/templates/items/${this.item.data.type}.html`;
  }
}
