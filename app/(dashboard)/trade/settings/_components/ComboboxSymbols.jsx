"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"


export default function ComboboxSymbols({ data, defaultSymbol }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultSymbol || "")

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <Label htmlFor="symbol">
                    Symbol
                </Label>
                <input name="symbol" value={value} type="text" onChange={e => setValue(e.target.value)} required hidden />
                <PopoverTrigger id="symbol" asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between w-full"
                    >
                        {value
                            ? data.find(({ symbol }) => symbol === value)?.symbol
                            : "Select symbol..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search symbol..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No symbol found.</CommandEmpty>
                            <CommandGroup>
                                {data.map(({ symbol }) => (
                                    <CommandItem
                                        key={symbol}
                                        value={symbol}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {symbol}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === symbol ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
