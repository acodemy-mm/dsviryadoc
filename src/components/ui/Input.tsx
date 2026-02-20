import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const inputBase = [
  'w-full rounded-lg border px-3 py-2 text-sm transition-all duration-150',
  'bg-white dark:bg-zinc-900',
  'text-[#0a1628] dark:text-zinc-100',
  'placeholder:text-[#9db0c8] dark:placeholder:text-zinc-500',
  'focus:outline-none focus:ring-2',
].join(' ');

const inputNormal = [
  'border-[#c9d5e8] dark:border-zinc-800',
  'focus:border-[#002c76] dark:focus:border-zinc-600',
  'focus:ring-[#002c76]/20 dark:focus:ring-zinc-600/30',
].join(' ');

const inputError = [
  'border-red-400 dark:border-red-500/50',
  'focus:border-red-500 dark:focus:border-red-500',
  'focus:ring-red-400/20 dark:focus:ring-red-500/20',
].join(' ');

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#0a1628] dark:text-zinc-300">
          {label}
        </label>
      )}
      <input
        ref={ref} id={id}
        className={cn(inputBase, error ? inputError : inputNormal, className)}
        {...props}
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#0a1628] dark:text-zinc-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref} id={id}
        className={cn(inputBase, error ? inputError : inputNormal, 'resize-y min-h-[120px]', className)}
        {...props}
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
);
Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#0a1628] dark:text-zinc-300">
          {label}
        </label>
      )}
      <select
        ref={ref} id={id}
        className={cn(inputBase, error ? inputError : inputNormal, className)}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
);
Select.displayName = 'Select';
