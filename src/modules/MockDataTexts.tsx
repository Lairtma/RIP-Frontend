import { ApiResponse } from "./MyInterface";


export const MOCK_DATA_TEXTS : ApiResponse = {
    Texts : [

        {

            id: 1,
            enc: true,
            text: "Текст:\nПривет, мир!",
            img: "",
            byteLen: 21,
            status: true,
        },
    
        {
    
            id: 2,
            enc: false,
            text: "Текст:\n1111 0001 1111 0000 1111 1010 1100",
            img: "",
            byteLen: 28,
            status: true,
    
        },
    
        {
    
            id: 3,
            enc: true,
            text: "Текст:\nHello, world!",
            img: "",
            byteLen: 13,
            status: true,
    
        }

    ]
}