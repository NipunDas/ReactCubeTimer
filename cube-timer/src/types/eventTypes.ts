export type EventID =
  | '333'
  | '222'
  | '444'
  | '555'
  | '666'
  | '777'
  | '333bf'
  | '333fm'
  | '333oh'
  | 'clock'
  | 'minx'
  | 'pyram'
  | 'skewb'
  | 'sq1'
  | '444bf'
  | '555bf'
  | '333mbf'

export type EventName =
  | '3x3'
  | '2x2'
  | '4x4'
  | '5x5'
  | '6x6'
  | '7x7'
  | '3x3 bld'
  | '3x3 fewest moves'
  | '3x3 oh'
  | 'clock'
  | 'megaminx'
  | 'pyraminx'
  | 'skewb'
  | 'square-1'
  | '4x4 bld'
  | '5x5 bld'
  | '3x3 multi-bld'

export const eventNameMap: Record<EventID, EventName> = {
  '333': '3x3',
  '222': '2x2',
  '444': '4x4',
  '555': '5x5',
  '666': '6x6',
  '777': '7x7',
  '333bf': '3x3 bld',
  '333fm': '3x3 fewest moves',
  '333oh': '3x3 oh',
  clock: 'clock',
  minx: 'megaminx',
  pyram: 'pyraminx',
  skewb: 'skewb',
  sq1: 'square-1',
  '444bf': '4x4 bld',
  '555bf': '5x5 bld',
  '333mbf': '3x3 multi-bld',
}
