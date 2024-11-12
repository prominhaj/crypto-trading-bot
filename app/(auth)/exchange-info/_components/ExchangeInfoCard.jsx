"use client";
import { connectExchange } from "@/app/actions/exchange";
import SubmitButton from "@/components/globals/Buttons/submit-button";
import FormControl from "@/components/globals/FormControl/FormControl";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActionState } from "react";

const ExchangeInfoCard = () => {
    const [state, action] = useActionState(connectExchange, undefined);

    return (
        <Card className="w-full max-w-md p-5 md:p-8 rounded-xl bg-muted/50">
            <h1 className="mb-8 text-3xl font-bold text-center">Select Exchange</h1>
            <form action={action} className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="exchange">
                        Exchange
                    </Label>
                    <Select name="name" id="exchange" value="bybit">
                        <SelectTrigger
                            className="w-full rounded-lg"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Bybit" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="bybit" className="rounded-lg">
                                Bybit
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <FormControl label="API KEY" name="api_key" error={state?.errors?.apiKey} />
                <FormControl label="API SECRET" name="api_secret" error={state?.errors?.apiSecret} />
                <SubmitButton>
                    Connect Exchange
                </SubmitButton>
            </form>
        </Card>
    );
};

export default ExchangeInfoCard;