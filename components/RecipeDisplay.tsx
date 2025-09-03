
import React from 'react';
import type { Recipe } from '../types';
import { LoaderIcon } from './icons/LoaderIcon';
import { ChefHatIcon } from './icons/ChefHatIcon';

interface RecipeDisplayProps {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
}

const WelcomeMessage: React.FC = () => (
    <div className="text-center p-8 border-2 border-dashed border-slate-300 rounded-lg">
        <ChefHatIcon className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-4 text-lg font-medium text-slate-800">Sẵn sàng nấu một món gì đó tuyệt vời chưa?</h3>
        <p className="mt-1 text-sm text-slate-500">Nhập nguyên liệu của bạn ở trên và để đầu bếp AI thể hiện phép màu!</p>
    </div>
);

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center text-slate-600">
        <LoaderIcon className="h-10 w-10 animate-spin text-amber-500" />
        <p className="mt-4 text-lg font-semibold">Đang sáng tạo công thức của bạn...</p>
        <p className="text-sm">Việc này có thể mất một chút thời gian.</p>
    </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
        <div className="flex">
            <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{message}</p>
            </div>
        </div>
    </div>
);

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
        <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold text-slate-900">{recipe.recipeName}</h2>
            <p className="mt-2 text-slate-600">{recipe.description}</p>

            <div className="mt-6">
                <h3 className="text-xl font-semibold text-slate-800 border-b-2 border-amber-400 pb-2">Nguyên liệu</h3>
                <ul className="mt-4 list-disc list-inside space-y-2 text-slate-700">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold text-slate-800 border-b-2 border-amber-400 pb-2">Hướng dẫn</h3>
                <ol className="mt-4 list-decimal list-inside space-y-3 text-slate-700">
                    {recipe.instructions.map((step, index) => (
                        <li key={index} className="pl-2">{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    </div>
);

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, isLoading, error }) => {
  if (isLoading) {
    return <LoadingState />;
  }
  if (error) {
    return <ErrorState message={error} />;
  }
  if (recipe) {
    return <RecipeCard recipe={recipe} />;
  }
  return <WelcomeMessage />;
};
