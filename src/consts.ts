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
export const DEFAULT_DEBUG_VALUE = {
	isOpenPanel: false,
	isBottomPanel: false,
	showOrientation: false,
}

export interface Tab {
	tab?: number | 'x'
	finger?: number
}

export type Bar = Record<string, Tab | undefined> & {
	separator?: boolean
	comment?: string
}

export interface Note {
	id: string
	name: string
	strings: number
	savedAt: number | null
	bars: Bar[]
}

export interface SharedNote extends Note {
	authorName?: string | null
	authorUrl?: string | null
}

export const DEMO_NAME = 'hello world 🤘🏻'
export const DEMO_STRING = 6
export const DEMO_BARS = [{6:{tab:5,finger:1},comment:'#1'},{6:{tab:6,finger:2}},{6:{tab:7,finger:3}},{6:{tab:8,finger:4}},{5:{tab:4,finger:1}},{5:{tab:5,finger:2}},{5:{tab:6,finger:3}},{5:{tab:7,finger:4}},{4:{tab:3,finger:1}},{4:{tab:4,finger:2}},{4:{tab:5,finger:3}},{4:{tab:6,finger:4}},{3:{tab:2,finger:1}},{3:{tab:3,finger:2}},{3:{tab:4,finger:3}},{3:{tab:5,finger:4},comment:'🦕'},{2:{tab:2,finger:1}},{2:{tab:3,finger:2}},{2:{tab:4,finger:3}},{2:{tab:5,finger:4}},{1:{tab:1,finger:1}},{1:{tab:2,finger:2}},{1:{tab:3,finger:3}},{1:{tab:4,finger:4}},{separator:true},{1:{tab:5,finger:4},comment:'#2'},{1:{tab:4,finger:3}},{1:{tab:3,finger:2}},{1:{tab:2,finger:1}},{2:{tab:6,finger:4}},{2:{tab:5,finger:3}},{2:{tab:4,finger:2}},{2:{tab:3,finger:1}},{3:{tab:6,finger:4}},{3:{tab:5,finger:3}},{3:{tab:4,finger:2}},{3:{tab:3,finger:1}},{4:{tab:7,finger:4}},{4:{tab:6,finger:3}},{4:{tab:5,finger:2}},{4:{tab:4,finger:1}},{5:{tab:8,finger:4}},{5:{tab:7,finger:3}},{5:{tab:6,finger:2}},{5:{tab:5,finger:1}},{6:{tab:9,finger:4}},{6:{tab:8,finger:3}},{6:{tab:7,finger:2}},{6:{tab:6,finger:1}},{},{6:{tab:5,finger:1}},{separator:true,comment:'x8'},{}]
