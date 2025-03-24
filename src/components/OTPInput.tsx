import { useEffect, useRef } from "react";

interface OTPInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, "").slice(0, 1); // Allow only numbers
    if (!newValue) return;

    const newOtp = [...value];
    newOtp[index] = newValue;
    onChange(newOtp);

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const newOtp = [...value];

      if (newOtp[index]) {
        newOtp[index] = "";
        onChange(newOtp);
        return;
      }

      if (index > 0) {
        newOtp[index - 1] = "";
        onChange(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    const emptyIndex = value.findIndex((digit) => digit === "");
    if (emptyIndex !== -1) {
      inputRefs.current[emptyIndex]?.focus();
    }
  }, [value]);

  return (
    <div className="flex gap-2 justify-start">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el:any) => (inputRefs.current[index] = el)}
          type="text"
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength={1}
          className="w-10 h-10 mr-4 text-center focus:shadow-soft-primary-outline text-sm ease-soft appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-600 focus:outline-none focus:transition-shadow"
        />
      ))}
    </div>
  );
};

export default OTPInput;
