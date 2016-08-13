import _ from 'lodash'

import {
    LOW_DUNE_WITH_GRASS_TOP_LEFT,
    LOW_DUNE_WITH_GRASS_TOP,
    LOW_DUNE_WITH_GRASS_TOP_RIGHT,
    LOW_DUNE_WITH_GRASS_LEFT,
    LOW_DUNE_WITH_GRASS_RIGHT,
    LOW_DUNE_WITH_GRASS_BOTTOM_LEFT,
    LOW_DUNE_WITH_GRASS_BOTTOM,
    LOW_DUNE_WITH_GRASS_BOTTOM_RIGHT,
    LOW_DUNE_WITH_GRASS_TOP_LEFT_INSIDE,
    LOW_DUNE_WITH_GRASS_TOP_RIGHT_INSIDE,
    LOW_DUNE_WITH_GRASS_BOTTOM_LEFT_INSIDE,
    LOW_DUNE_WITH_GRASS_BOTTOM_RIGHT_INSIDE,
    ROUND_ROCK_BROWN
} from 'shared/game/configs/Tiles'

export const IMPASSABLE_OBJECTS = _.flattenDeep(['S1-C14-R16-B3', 'S1-C13-R16-B3', 'S1-C11-R14-B4', 'S1-C12-R14-B4', 'S1-C11-R14-B2', 'S1-C12-R14-B2', 'S1-C14-R17-B1', 'S1-C13-R17-B1', LOW_DUNE_WITH_GRASS_TOP_LEFT, LOW_DUNE_WITH_GRASS_TOP, LOW_DUNE_WITH_GRASS_TOP_RIGHT, LOW_DUNE_WITH_GRASS_LEFT, LOW_DUNE_WITH_GRASS_RIGHT, LOW_DUNE_WITH_GRASS_BOTTOM_LEFT, LOW_DUNE_WITH_GRASS_BOTTOM, LOW_DUNE_WITH_GRASS_BOTTOM_RIGHT, LOW_DUNE_WITH_GRASS_TOP_LEFT_INSIDE, LOW_DUNE_WITH_GRASS_TOP_RIGHT_INSIDE, LOW_DUNE_WITH_GRASS_BOTTOM_LEFT_INSIDE, LOW_DUNE_WITH_GRASS_BOTTOM_RIGHT_INSIDE, ROUND_ROCK_BROWN])

console.log(IMPASSABLE_OBJECTS)