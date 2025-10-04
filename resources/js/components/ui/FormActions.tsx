import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from './Button';
import { ArrowLeft, Save, X } from 'lucide-react';

interface FormActionsProps {
  onCancel?: () => void;
  cancelHref?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  submitLabel?: string;
  submitIcon?: React.ComponentType<any>;
  isLoading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  className?: string;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  cancelHref,
  cancelLabel = 'Cancel',
  onSubmit,
  submitLabel = 'Save',
  submitIcon: SubmitIcon = Save,
  isLoading = false,
  loadingLabel = 'Saving...',
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between pt-6 border-t border-border ${className}`}>
      <div className="flex items-center space-x-4">
        {cancelHref ? (
          <Link href={cancelHref}>
            <Button variant="outline" type="button" disabled={isLoading}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {cancelLabel}
            </Button>
          </Link>
        ) : onCancel ? (
          <Button variant="outline" type="button" onClick={onCancel} disabled={isLoading}>
            <X className="mr-2 h-4 w-4" />
            {cancelLabel}
          </Button>
        ) : null}
      </div>

      <div className="flex items-center space-x-4">
        <Button
          type="submit"
          onClick={onSubmit}
          disabled={disabled || isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              {loadingLabel}
            </>
          ) : (
            <>
              <SubmitIcon className="mr-2 h-4 w-4" />
              {submitLabel}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
