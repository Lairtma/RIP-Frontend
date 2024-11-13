export interface Text {

    id:number
	enc:boolean
	text:string
	img:string
	byteLen:number
	status:boolean

}

export interface ApiResponse {
    Texts: Text[];
}