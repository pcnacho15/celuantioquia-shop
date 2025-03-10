// import { GitHubLogin } from "@/components/auth/github-login";
import { GoogleLogin } from "@/modules/auth";
import { LoginForm } from "./ui/LoginForm";
// import { AppleLogin } from "@/components/auth/apple-login";

export default function LoginPage() {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 px-14 py-16 rounded-2xl bg-white shadow-lg">
      <h1 className="font-bold text-2xl mb-5 text-center">Iniciar sesión</h1>

      {/* <GitHubLogin /> */}
      <GoogleLogin />
      {/* <AppleLogin /> */}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O ingresar con correo</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
      <LoginForm />
    </div>
  );
}
