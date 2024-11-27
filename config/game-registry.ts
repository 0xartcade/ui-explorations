export const GAME_TYPES = {
    'artguessr-6529': {
      name: 'ArtGuessr 6529',
      path: 'games/artguessr-6529/game-interface',
    },
    'template': {
      name: 'Game Template',
      path: 'games/game-template/game-interface',
    }
  } as const
  
  export const GAME_MODES = {
    '6529-collection': {
      name: '6529 Collection',
      dataUrl: 'https://noaskfrnx3lefz7r.public.blob.vercel-storage.com/6529-memes-1-302-ICCX18MmBs6NxwL2wMEwJr5xQfH5Bx.json'
    }
  } as const
  
  // Type helpers
  export type GameTypeId = keyof typeof GAME_TYPES
  export type GameModeId = keyof typeof GAME_MODES