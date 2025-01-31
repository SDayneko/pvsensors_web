import { auth } from "@/lib/auth";
import { SignOut } from "./sign-out";

export default async function LoginUser() {
    const session = await auth();
    return (
    <>
        {session && 
            <div className="flex items-center gap-4 mt-4">
                {session.user?.image && (
                    <img
                        src={session.user.image}
                        alt="User profile"
                        className="w-10 h-10 rounded-full border border-gray-300"
                    />
                )}
                <SignOut />
            </div>
        }
    </>
  );
}