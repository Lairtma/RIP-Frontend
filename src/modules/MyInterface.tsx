export interface Text {
	byte_len: number;
	enc: boolean;
	id: number;
	img: string;
	status: boolean;
	text: string;

}

export interface ApiResponse {
    Texts: Text[];
	OrderId: number;
	TextsInOrderCount: number;
}

export interface User {
    fio: string;
	id: number;
	is_moderator: boolean;
	login: string;
	password: string;
}

export interface OrderRequest {
    Creator: User;
	creator_id: number;
	date_create: string;
	date_finish: string;
	date_update: string;
	id: number;
	Moderator: User;
	moderator_id: number;
	priority: number;
	status: number;
}

export interface OrderResponse {
    Order: OrderRequest;
    count: number;
    Texts: Text[];
}