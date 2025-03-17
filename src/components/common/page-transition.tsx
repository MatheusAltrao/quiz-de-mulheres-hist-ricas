import { Loader } from "lucide-react";

export function PageTransition() {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-2 bg-white">
      <p>Criando o Quiz</p>
      <Loader size={20} className="animate-spin" />
    </div>
  );
}
