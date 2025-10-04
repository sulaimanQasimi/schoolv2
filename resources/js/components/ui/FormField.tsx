import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'url' | 'textarea' | 'select';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  success?: string;
  helpText?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  className?: string;
  icon?: React.ComponentType<any>;
  iconPosition?: 'left' | 'right';
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  success,
  helpText,
  options = [],
  rows = 3,
  className = '',
  icon: Icon,
  iconPosition = 'left',
}) => {
  const baseInputClasses = `
    w-full px-3 py-2 border rounded-lg bg-background text-foreground 
    placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring 
    focus:border-transparent transition-colors
    ${error ? 'border-destructive' : success ? 'border-green-500' : 'border-input'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${Icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
    ${className}
  `;

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={baseInputClasses}
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={baseInputClasses}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={baseInputClasses}
      />
    );
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-foreground flex items-center gap-2">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        )}
        
        {renderInput()}
        
        {Icon && iconPosition === 'right' && (
          <Icon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {helpText && !error && !success && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
