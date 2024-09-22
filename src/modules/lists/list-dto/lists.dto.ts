export class createListDTO {
    name: string;
    custom_fields: Record<string, any>;
    organization_id: string;
}

export class updateListDTO {
    name: string;
    custom_fields: Record<string, any>;
}