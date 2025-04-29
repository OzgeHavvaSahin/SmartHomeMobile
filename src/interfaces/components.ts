export interface LogoHeaderProps {
    title: string;
    subtitle: string;
    logoSource: any; // Using any for the image source type
  }
  
export interface ErrorMessageProps {
    message: string | null;
  }
  

export interface SignInFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    isLoading: boolean;
    onSubmit: () => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
  }