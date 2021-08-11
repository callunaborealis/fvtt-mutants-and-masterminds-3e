import { OwnActor } from "../documents/actor";
import { OwnItem } from "../documents/item";
import { OWN_CONFIG } from "../helpers/config";

export class OwnGame extends Game {
  own: {
    OwnActor: typeof OwnActor;
    OwnItem: typeof OwnItem;
  };
}

export interface OwnCONFIG extends CONFIG {
  OWN: typeof OWN_CONFIG;
}
