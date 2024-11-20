import { Text, ApiResponse } from "./MyInterface";
import { MOCK_DATA_TEXTS } from "./MockDataTexts";



export const getTextByType = async (
    textType : string,
  ): 
  Promise<ApiResponse> => {


    try {

      const response = await fetch("/api/texts");
      const info = await response.json();
      return { Texts: info["texts"] };
    } 
    catch(error) {
      const filteredData = MOCK_DATA_TEXTS.Texts.filter(text => 
        text.enc == true && textType == "en" || text.enc == false && textType == "de" || textType == ""
      );

      return { Texts: filteredData };
    }

};

export const getTextById = async (
    text_id : string | number
  ): 
  Promise<Text> => {

    try {
      const response = await fetch(`/api/texts/${text_id}`);
      const info = await response.json();
      return info["text"];
    } 
    catch(error) {
      return MOCK_DATA_TEXTS.Texts[Number(text_id) - 1]
    }

};