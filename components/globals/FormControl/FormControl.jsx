"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FormControl = ({ label, name, type = "text", defaultValue, error, required = true, optional = false, className }) => {
    return (
        <div className={cn(className, "space-y-1.5")}>
            <Label className="flex items-center justify-between" htmlFor={name}>
                {label}
                {
                    optional && <small>Optional</small>
                }
            </Label>
            <Input
                className={cn(error && "!border-red-500")}
                id={name}
                name={name}
                type={type}
                placeholder={`Enter your ${name}`}
                defaultValue={defaultValue}
                required={required}
            />
            {error && <p className='flex flex-col gap-0.5 text-red-500'>
                {error.map((err, index) => (
                    <small key={index}>
                        {err}
                    </small>
                ))}
            </p>}
        </div>
    );
};

export default FormControl;