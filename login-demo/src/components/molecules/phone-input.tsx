import * as React from "react";
import { cn } from "@/lib/utils";
import { validateIranianMobile } from "@/lib/auth";

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

/**
 * PhoneInput is a reusable React component for entering Iranian mobile phone numbers.
 * It provides validation feedback, error display, and supports forwarding refs.
 *
 * @component
 * @param {PhoneInputProps} props - The props for the PhoneInput component.
 * @param {string} [props.className] - Additional CSS classes to apply to the input element.
 * @param {string} [props.error] - Error message to display below the input.
 * @param {string} [props.label] - Optional label to display above the input.
 * @param {React.Ref<HTMLInputElement>} ref - Ref forwarded to the underlying input element.
 * @returns {JSX.Element} The rendered PhoneInput component.
 *
 * @example
 * ```tsx
 * <PhoneInput
 *   label="شماره موبایل"
 *   error={formError}
 *   onChange={handleChange}
 *   ref={inputRef}
 * />
 * ```
 *
 * @remarks
 * - Accepts Iranian mobile formats: 09xxxxxxxxx, +989xxxxxxxx, 00989xxxxxxxx.
 * - Shows a validation indicator when the input is valid.
 * - Displays error messages and supports custom styling.
 */
const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, error, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isValid, setIsValid] = React.useState<boolean | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length > 0) {
        setIsValid(validateIranianMobile(value));
      } else {
        setIsValid(null);
      }
      props.onChange?.(e);
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="tel"
            dir="ltr"
            placeholder="09xxxxxxxxx"
            className={cn(
              "flex h-12 w-full rounded-lg border border-input bg-white dark:text-black px-4 py-2 text-base",
              "transition-all duration-200 ease-smooth",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
              "focus-visible:border-primary focus-visible:shadow-elegant",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:ring-destructive",
              isValid === true && "border-primary",
              isValid === false && "border-destructive",
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onChange={handleChange}
            {...props}
          />
          
          {/* Validation indicator */}
          {isValid === true && !error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-destructive animate-in slide-in-from-left-2 duration-200">
            {error}
          </p>
        )}
        
        <p className="text-xs text-muted-foreground">
          فرمت‌های قابل قبول: 09xxxxxxxx, +989xxxxxxxx, 00989xxxxxxxx
        </p>
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };