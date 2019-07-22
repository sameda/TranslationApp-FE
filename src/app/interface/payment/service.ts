declare type ModuleType = 1|2|3|4
export interface ServiceDto {
    id: number;
    name: string;
    price: number;
    module: ModuleType;
    selected?: boolean;
    paid?:boolean;
}