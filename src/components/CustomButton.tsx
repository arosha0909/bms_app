import React from "react";

interface CustomButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    type = "button",
    onClick,
    disabled = false,
    loading = false,
    className = "",
    children,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`inline-block w-full px-6 py-3 mt-6 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {loading ? "Processing..." : children}
        </button>
    );
};

export default CustomButton;
