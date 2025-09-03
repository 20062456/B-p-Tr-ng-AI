
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IngredientInput } from './components/IngredientInput';
import { RecipeDisplay } from './components/RecipeDisplay';
import { generateRecipe } from './services/geminiService';
import type { Recipe } from './types';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (!ingredients.trim()) {
      setError('Vui lòng nhập một vài nguyên liệu.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const generatedRecipe = await generateRecipe(ingredients);
      setRecipe(generatedRecipe);
    } catch (err) {
      console.error(err);
      setError('Không thể tạo công thức. Vui lòng kiểm tra lại nguyên liệu của bạn hoặc thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  return (
    <div className="min-h-screen font-sans text-slate-800 antialiased">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Header />
        <div className="mt-8">
          <IngredientInput
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onSubmit={handleGenerateRecipe}
            isLoading={isLoading}
          />
        </div>
        <div className="mt-8">
          <RecipeDisplay recipe={recipe} isLoading={isLoading} error={error} />
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-slate-500">
        <p>Cung cấp bởi Gemini AI. Cùng vào bếp nào!</p>
      </footer>
    </div>
  );
};

export default App;
