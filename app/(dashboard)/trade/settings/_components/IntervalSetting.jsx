"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// interval settings
const intervalTimer = [
    { label: "1 second", value: 1 },
    { label: "3 seconds", value: 3 },
    { label: "5 seconds", value: 5 },
    { label: "7 seconds", value: 7 },
    { label: "10 seconds", value: 10 },
    { label: "15 seconds", value: 15 },
    { label: "20 seconds", value: 20 },
    { label: "25 seconds", value: 25 },
    { label: "30 seconds", value: 30 },
    { label: "40 seconds", value: 40 },
    { label: "50 seconds", value: 50 },
    { label: "1 minute", value: 60 },
    { label: "3 minutes", value: 180 },
    { label: "5 minutes", value: 300 },
    { label: "10 minutes", value: 600 },
    { label: "15 minutes", value: 900 },
    { label: "20 minutes", value: 1200 },
    { label: "30 minutes", value: 1800 },
    { label: "1 hour", value: 3600 },
];

const IntervalSetting = ({ defaultInterval }) => {
    const [interval, setInterval] = useState(defaultInterval);

    return (
        <>
            <div className="flex flex-col gap-3">
                <input
                    name="interval"
                    value={interval}
                    onChange={e => setInterval(e.target.value)}
                    type="number"
                    hidden
                    required
                />
                <Label htmlFor="interval">Interval</Label>
                <Select name="interval" value={interval} onValueChange={(value) => setInterval(value)}>
                    <SelectTrigger id="interval">
                        <SelectValue placeholder="Select interval">
                            {intervalTimer.find(item => item.value === interval)?.label || "Select interval"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {intervalTimer.map(item => (
                            <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default IntervalSetting;
