export interface SettingsGetDto { 
    id: number,
    name: string,
    value: boolean
}

export interface SettingsPatchDto { 
    id: number,
    value: boolean
}