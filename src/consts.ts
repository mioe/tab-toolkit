export enum ColorFinger {
	finger1 = '#e64953',
	finger2 = '#52b5f9',
	finger3 = '#fadf62',
	finger4 = '#74de6b',
}

export const DEFAULT_NAME = 'Song'
export const DEFAULT_STRING = 6
export const DEFAULT_BARS = [{}]
export const DEFAULT_BAR_IDX = 0

export interface Tab {
	tab?: number | 'x'
	finger?: number
}

export type Bar = Record<string, Tab | undefined> & {
	separator?: boolean
}

export interface Note {
	id: string
	name: string
	strings: number
	savedAt: number | null
	bars: Bar[]
}
