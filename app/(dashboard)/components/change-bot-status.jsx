"use client";
import { changeBotStatus } from "@/app/actions/bot";
import SubmitButton from "@/components/globals/Buttons/submit-button";
import { useSidebar } from "@/components/ui/sidebar";
import { CirclePause, CirclePlay } from "lucide-react";
import { toast } from "sonner";

const ChangeBotStatus = ({ isBotAction }) => {
    const { state } = useSidebar();

    const handleBotStatus = async () => {
        try {
            const botStatus = await changeBotStatus(isBotAction);
            if (botStatus) {
                toast.success("Bot Started Success")
            }
            else {
                toast.success("Bot Stop Success")
            }
        } catch (error) {
            toast.error('Error updating bot status:', error.message);
        }
    }


    return (
        <form action={handleBotStatus}>
            {
                isBotAction ? (
                    <SubmitButton className="font-semibold">
                        {
                            state === "collapsed" ? (
                                <CirclePlay className="!w-5 !h-5" />
                            ) : (
                                <>
                                    <CirclePlay className="!w-5 !h-5" />
                                    Start Bot
                                </>
                            )
                        }
                    </SubmitButton>
                ) : (
                    <SubmitButton variant="destructive" className="font-semibold">
                        {
                            state === "collapsed" ? (
                                <CirclePause className="!w-5 !h-5" />
                            ) : (
                                <>
                                    <CirclePause className="!w-5 !h-5" />
                                    Stop Bot
                                </>
                            )
                        }
                    </SubmitButton>
                )
            }
        </form>
    );
};

export default ChangeBotStatus;