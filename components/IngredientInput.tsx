
import React from 'react';
import { LoaderIcon } from './icons/LoaderIcon';

interface IngredientInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <label htmlFor="ingredients" className="block text-lg font-medium text-slate-700">
        Liệt kê nguyên liệu của bạn
      </label>
      <p className="text-sm text-slate-500 mt-1">Phân tách các mục bằng dấu phẩy hoặc xuống dòng, ví dụ: "ức gà, gạo, bông cải xanh".</p>
      <textarea
        id="ingredients"
        name="ingredients"
        rows={4}
        className="mt-3 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm transition duration-150 ease-in-out"
        placeholder="ví dụ: thịt bò xay, cà chua, hành tây, mì ống..."
        value={value}
        onChange={onChange}
        disabled={isLoading}
      />
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Đang tạo...
            </>
          ) : (
            'Tạo Công Thức'
          )}
        </button>
      </div>
    </div>
  );
};
