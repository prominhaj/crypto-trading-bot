"use client";

import FormControl from "@/components/globals/FormControl/FormControl";
import { Card } from "@/components/ui/card";
import ComboboxSymbols from "./ComboboxSymbols";
import SubmitButton from "@/components/globals/Buttons/submit-button";
import IntervalSetting from "./IntervalSetting";
import SlTPOrderType from "./SlTPOrderType";
import { useActionState } from "react";
import { tradeSettings } from "@/app/actions/bot";

const TradeSettingForm = ({ symbols, sessionUser }) => {
    const [state, action] = useActionState(tradeSettings, undefined)

    const defaultSymbol = sessionUser?.tradeSettings?.symbol || "";
    const defaultInterval = sessionUser?.tradeSettings?.interval || "";
    const defaultSlPercentage = sessionUser?.tradeSettings?.sl_percentage || 0;
    const defaultTPPercentage = sessionUser?.tradeSettings?.tp_percentage || 0;
    const defaultSlTPOrderType = sessionUser?.tradeSettings?.sl_tp_order_type || "";
    const defaultSlLimitPriceDistance = sessionUser?.tradeSettings?.sl_limit_price_distance || 0;


    return (
        <Card className="w-full p-5 md:max-w-4xl md:p-8 rounded-xl bg-muted/50">
            <h1 className="mb-8 text-2xl font-bold text-center md:text-3xl">Trade Settings</h1>
            {/* Form fields */}
            <form action={action} className="grid gap-5 md:grid-cols-2">
                <ComboboxSymbols data={symbols} defaultSymbol={defaultSymbol} />
                <IntervalSetting defaultInterval={defaultInterval} />
                <FormControl
                    label="SL %"
                    name="sl_percentage"
                    type="number"
                    defaultValue={defaultSlPercentage}
                    optional
                    error={state?.errors?.sl_percentage}
                />
                <FormControl
                    label="TP %"
                    name="tp_percentage"
                    type="number"
                    defaultValue={defaultTPPercentage}
                    optional
                    error={state?.errors?.tp_percentage}
                />
                <SlTPOrderType defaultSlTPOrderType={defaultSlTPOrderType} />
                <FormControl
                    className="flex flex-col gap-3 space-y-0"
                    label="SL Limit Price Distance %"
                    name="sl_limit_price_distance"
                    type="number"
                    defaultValue={defaultSlLimitPriceDistance}
                    optional
                    error={state?.errors?.sl_limit_price_distance}
                />
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