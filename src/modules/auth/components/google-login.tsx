import { Google } from "./google";
import { googleSignIn } from "../actions/loginGoogle";


export const GoogleLogin = () => {
  return (
    <form
      action={googleSignIn}
    >
      <button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium ring-offset-background border border-black py-2 my-3 hover:scale-105 duration-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 w-full"
        //   variant="outline"
      >
        <Google />
        Ingresar con Google
      </button>
    </form>
  );
};

