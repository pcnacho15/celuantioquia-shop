import { fontTitle } from "@/utils";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <div className="border border-gray-400 rounded-2xl p-14">
        <h1 className={`${fontTitle.className} font-bold text-2xl mb-5`}>Iniciar sesión</h1>
        <LoginForm />
      </div>
    </div>
  );
}
