"use client";

import FormControl from "@/components/globals/FormControl/FormControl";
import { Card } from "@/components/ui/card";
import ComboboxSymbols from "./ComboboxSymbols";
import SubmitButton from "@/components/globals/Buttons/submit-button";
import IntervalSetting from "./IntervalSetting";

const TradeSettingForm = ({ symbols, sessionUser }) => {
    const defaultSymbol = sessionUser?.tradeSettings?.symbol || "";
    const defaultInterval = sessionUser?.tradeSettings?.interval || "";

    const tradeSettings = [
        "Symbol",
        "Interval",
        "Stop_Loss_Percentage",
        "Take_Profit_Percentage",
        "SL_TP_Order_Type",
        "SL_Limit_Price_Distance_Percentage",
    ]

    const handleTradeSettings = async (formData) => {
        console.log(formData.get("symbol"));
        console.log(formData.get("interval"));

    }

    return (
        <Card className="w-full p-5 md:max-w-4xl md:p-8 rounded-xl bg-muted/50">
            <h1 className="mb-8 text-2xl font-bold text-center md:text-3xl">Trade Settings</h1>
            {/* Form fields */}
            <form action={handleTradeSettings} className="grid gap-5 md:grid-cols-2">
                <ComboboxSymbols data={symbols} defaultSymbol={defaultSymbol} />
                <IntervalSetting defaultInterval={defaultInterval} />
                {/* <FormControl label="" name, type = "text", defaultValue, error /> */}
                <div className="md:col-span-2">
                    <SubmitButton>
                        Save Settings
                    </SubmitButton>
                </div>
            </form>
        </Card>
    );
};

export default TradeSettingForm;