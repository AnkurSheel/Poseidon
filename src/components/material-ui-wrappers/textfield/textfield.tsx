export interface ITextFieldProps {
    className: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlurValidation: () => boolean;
    errorText: string;
    label: string;
    placeholder?: string;
}
