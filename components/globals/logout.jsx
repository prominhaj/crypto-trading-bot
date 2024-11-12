import { LogOut } from "lucide-react";
import SubmitButton from "./Buttons/submit-button";
import { logout } from "@/app/actions/auth";

const Logout = () => {
    return (
        <form action={logout} className="w-full">
            <SubmitButton variant="destructive" size="sm">
                <LogOut />
                Log out
            </SubmitButton>
        </form>
    );
};

export default Logout;