import { IsObject, IsOptional, IsString } from "class-validator";

export class CreateSubscriberDto {
    @IsString()
    gpg_public_key: string;

    @IsString()
    email: string;

    @IsString()
    organization_id: string;

    @IsOptional()
    @IsObject()
    custom_fields?: Record<string, any>;
}

export class UpdateSubscriberDto {
    @IsString()
    gpg_public_key: string;

    @IsString()
    email: string;

    @IsString()
    organization_id: string;

    @IsOptional()
    @IsObject()
    custom_fields?: Record<string, any>;
}