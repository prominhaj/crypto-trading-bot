"use client";
import { changeBotStatus } from "@/app/actions/bot";
import SubmitButton from "@/components/globals/Buttons/submit-button";
import { useSidebar } from "@/components/ui/sidebar";
import { CirclePause, CirclePlay } from "lucide-react";
import { startTransition } from "react";
import { toast } from "sonner";

const ChangeBotStatus = ({ isBotAction }) => {
    const { state } = useSidebar();

    const handleBotStatus = () => {
        startTransition(async () => {
            try {
                const botStatus = await changeBotStatus(isBotAction);
                toast.success(botStatus ? "Bot Started Successfully" : "Bot Stopped Successfully");
            } catch (error) {
                toast.error(`Error updating bot status: ${error.message}`);
            }
        });
    };

    const icon = isBotAction ? <CirclePause className="!w-5 !h-5" /> : <CirclePlay className="!w-5 !h-5" />;
    const buttonText = isBotAction ? "Stop Bot" : "Start Bot";
    const buttonVariant = isBotAction ? "destructive" : "default";

    return (
        <form action={handleBotStatus}>
            <SubmitButton
                variant={buttonVariant}
                className="font-semibold"
            >
                {icon}
                {state !== "collapsed" && buttonText}
            </SubmitButton>
        </form>
    );
};

export default ChangeBotStatus;