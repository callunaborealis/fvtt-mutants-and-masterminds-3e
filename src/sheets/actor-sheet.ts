import { templateDirectory } from "../helpers/templates";

import type { OwnCONFIG, OwnGame } from "../types";
import type { CharacterAbility } from "../types/character";

declare var game: OwnGame;
declare var CONFIG: OwnCONFIG;

interface DataShape {
  abilities: Record<CharacterAbility, string>;
  gear: OwnActorSheetData["items"];
}

type OwnActorSheetData = ActorSheet.Data<ActorSheet.Options> & {
  data: ActorSheet.Data<ActorSheet.Options>["data"] & DataShape;
};

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class OwnActorSheet extends ActorSheet<
  ActorSheet.Options,
  OwnActorSheetData
> {
  /** @override */
  get template() {
    /**
     * @todo figure out why actor.type is always base
     */
    return templateDirectory.actor.character;
  }

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData() as OwnActorSheetData;

    // Use a safe clone of the actor data for further operations.
    const actorData = context.actor.data;

    // Prepare character data and items.
    if (actorData.type == "character") {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == "npc") {
      this._prepareItems(context);
    }

    return {
      ...context,
      data: {
        ...context.data,
        // Add the actor's data to context.data for easier access
        ...actorData.data,
      },
      // Add the actor's flags to context for easier access
      flags: actorData.flags,
      // Add roll data for TinyMCE editors.
      rollData: context.actor.getRollData(),
      // Prepare active effects. WIP
      // effects: prepareActiveEffectCategories(this.actor.effects),
    };
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {void}
   */
  _prepareItems(context: OwnActorSheetData): void {
    // Initialize containers.
    const gear: OwnActorSheetData["items"] = [];

    // Iterate through items, allocating to containers
    context.items.forEach((item) => {
      // Append to gear.
      if (item.type === "item") {
        gear.push(item);
      }
    });

    // Assign and return
    context.data.gear = gear;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param actorData The actor to prepare.
   *
   */
  _prepareCharacterData(context: OwnActorSheetData): void {
    // Handle ability scores.
    const actorAbilities = context.data.abilities;
    Object.keys(actorAbilities).forEach((key, i) => {
      context.data.abilities[key] =
        game.i18n.localize(CONFIG.OWN.abilities[key]) ?? key;
    });
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    // Render the item sheet for viewing/editing prior to the editable check.
    html.find(".item-edit").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      if (item?.sheet) {
        item.sheet.render(true);
      }
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.find(".item-create").click(this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.find(".item-delete").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      if (item) {
        item.delete();
      }
      li.slideUp(200, () => this.render(false));
    });
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param event   The originating click event
   */
  private async _onItemCreate(
    event: Event & {
      currentTarget: Event["currentTarget"] & {
        dataset: { type: string };
      };
    },
  ) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header?.dataset.type;
    // Grab any data associated with this control.
    // Remove the type from the dataset since it's in the itemData.type prop.
    const { type: _, ...dataWithoutType } = duplicate(header?.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: dataWithoutType,
    };

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }
}
