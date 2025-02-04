import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button className="w-full" variant="outline">
        <Icons.gitHub className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };