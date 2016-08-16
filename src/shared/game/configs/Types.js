import {
    CHARACTER_2,
    TILE_GROUND,
    GRASS_GREEN,
    STONE_GATE,
    LOW_DUNE_WITH_GRASS_TOP_LEFT,
    LOW_DUNE_WITH_GRASS_TOP,
    LOW_DUNE_WITH_GRASS_TOP_RIGHT,
    LOW_DUNE_WITH_GRASS_LEFT,
    LOW_DUNE_WITH_GRASS_CENTER,
    LOW_DUNE_WITH_GRASS_RIGHT,
    LOW_DUNE_WITH_GRASS_BOTTOM_LEFT,
    LOW_DUNE_WITH_GRASS_BOTTOM,
    LOW_DUNE_WITH_GRASS_BOTTOM_RIGHT,
    LOW_DUNE_WITH_GRASS_TOP_LEFT_INSIDE,
    LOW_DUNE_WITH_GRASS_TOP_RIGHT_INSIDE,
    LOW_DUNE_WITH_GRASS_BOTTOM_LEFT_INSIDE,
    LOW_DUNE_WITH_GRASS_BOTTOM_RIGHT_INSIDE,
    STAIR_SILVER_TOP,
    STAIR_BROWN_LEFT,
    STAIR_BROWN_RIGHT,
    STAIR_SILVER_BOTTOM,
    ROUND_ROCK_BROWN,
    EMPTY,
    SMALL_TREE_MINT,
    PERFECT_TREE_MINT,
    PIKACHU,
    CHARIZARD,
    BEEDRILL,
    GOLBAT,
    CLEFABLE,
    WIGGLYTUFF,
    PIDGEOT,
    VENUSAUR,
    VILEPLUME,
    PARASECT,
    DRAGONITE
} from 'shared/game/configs/Tiles'

export const PLAYER = CHARACTER_2

export const UNKNOWN = DRAGONITE

export const GROUND = TILE_GROUND
export const GRASS = GRASS_GREEN
export const DIRECTORY = STONE_GATE
export const FILE = {
    md: PIKACHU,
    js: CHARIZARD,
    json: BEEDRILL,
    yml: GOLBAT,
    css: CLEFABLE,
    scss: WIGGLYTUFF,
    html: PIDGEOT,
    pug: VENUSAUR,
    png: VILEPLUME,
    jpg: PARASECT
}

export const PATH = EMPTY

export const SMALL_TREE = SMALL_TREE_MINT
export const MEDIUM_TREE = PERFECT_TREE_MINT

export const STAIR_TOP = STAIR_SILVER_TOP
export const STAIR_LEFT = STAIR_BROWN_LEFT
export const STAIR_RIGHT = STAIR_BROWN_RIGHT
export const STAIR_BOTTOM = STAIR_SILVER_BOTTOM

export const DUNE_TOP_LEFT = LOW_DUNE_WITH_GRASS_TOP_LEFT
export const DUNE_TOP = LOW_DUNE_WITH_GRASS_TOP
export const DUNE_TOP_RIGHT = LOW_DUNE_WITH_GRASS_TOP_RIGHT
export const DUNE_LEFT = LOW_DUNE_WITH_GRASS_LEFT
export const DUNE_CENTER = LOW_DUNE_WITH_GRASS_CENTER
export const DUNE_RIGHT = LOW_DUNE_WITH_GRASS_RIGHT
export const DUNE_BOTTOM_LEFT = LOW_DUNE_WITH_GRASS_BOTTOM_LEFT
export const DUNE_BOTTOM = LOW_DUNE_WITH_GRASS_BOTTOM
export const DUNE_BOTTOM_RIGHT = LOW_DUNE_WITH_GRASS_BOTTOM_RIGHT

export const DUNE_TOP_LEFT_INSIDE = LOW_DUNE_WITH_GRASS_TOP_LEFT_INSIDE
export const DUNE_TOP_RIGHT_INSIDE = LOW_DUNE_WITH_GRASS_TOP_RIGHT_INSIDE
export const DUNE_BOTTOM_LEFT_INSIDE = LOW_DUNE_WITH_GRASS_BOTTOM_LEFT_INSIDE
export const DUNE_BOTTOM_RIGHT_INSIDE = LOW_DUNE_WITH_GRASS_BOTTOM_RIGHT_INSIDE
