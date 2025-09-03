
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { 
      type: Type.STRING, 
      description: "Tiêu đề của công thức." 
    },
    description: { 
      type: Type.STRING, 
      description: "Mô tả ngắn gọn, hấp dẫn về món ăn." 
    },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Danh sách tất cả các nguyên liệu cần thiết cho công thức, bao gồm cả số lượng."
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Hướng dẫn từng bước để chuẩn bị món ăn."
    }
  },
  required: ["recipeName", "description", "ingredients", "instructions"]
};

export const generateRecipe = async (userIngredients: string): Promise<Recipe> => {
  const prompt = `Bạn là một đầu bếp sáng tạo. Dựa trên những nguyên liệu sau đây, hãy tạo ra một công thức nấu ăn ngon bằng tiếng Việt. 
  Liệt kê các nguyên liệu bạn đã sử dụng và cung cấp hướng dẫn từng bước. Nếu cần một loại gia vị thông thường như muối, tiêu, hoặc dầu ăn, 
  bạn có thể bao gồm và đề cập đến nó.
  
  Đây là các nguyên liệu: ${userIngredients}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    // It is possible for the model to return markdown ```json ... ```, so we strip it.
    const cleanedJsonText = jsonText.replace(/^`{3}json\s*|`{3}$/g, '');
    const recipeData: Recipe = JSON.parse(cleanedJsonText);
    
    return recipeData;

  } catch (error) {
    console.error("Error generating recipe from Gemini:", error);
    throw new Error("Không thể kết nối với mô hình AI.");
  }
};
