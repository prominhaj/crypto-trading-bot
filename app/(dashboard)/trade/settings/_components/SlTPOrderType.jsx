"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const SlTPOrderType = ({ defaultSlTPOrderType }) => {
    const [slTpOrderType, setSlTpOrderType] = useState(defaultSlTPOrderType);

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="sl_tp_order_type">SL TP Order Type</Label>
            <Select value={slTpOrderType} onValueChange={(value) => setSlTpOrderType(value)} name="sl_tp_order_type">
                <SelectTrigger id="sl_tp_order_type">
                    <SelectValue className="!capitalize" placeholder="Select SL TP Order Type">
                        {slTpOrderType}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="limit">Limit</SelectItem>
                    <SelectItem value="market">Market</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SlTPOrderType;