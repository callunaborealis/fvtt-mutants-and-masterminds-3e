import { CONFIG_OWN } from "../helpers/config";

import type { OwnActor } from "../documents/actor";
import type { OwnItem } from "../documents/item";

class OwnGame extends Game {
  own: {
    Actor: typeof OwnActor;
    Item: typeof OwnItem;
  };
}

interface OwnCONFIG extends CONFIG {
  OWN: typeof CONFIG_OWN;
}

export type { OwnCONFIG, OwnGame };
