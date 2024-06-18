import Image from "next/image";
import SignUpForm from "./auth/forms/SignUpForm";
import SignInForm from "./auth/forms/SignInForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative bg-white shadow-xl rounded-3xl p-20 bg-clip-padding border border-gray-300 backdrop-blur-lg backdrop-filter">
        <SignInForm />
      </div>
    </main>
  );
}
