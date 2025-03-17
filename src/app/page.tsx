import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <div className="mt-[33vh]">
        <div className="space-y-4">
          <div>
            <h1 className="font-bold text-3xl">
              Iniciar quiz sobre mulheres históricas
            </h1>
            <p className="text-muted-foreground">
              Este é um quiz com 5 perguntas, cada uma com 4 alternativas.{" "}
              <br /> No final, você verá sua pontuação!
            </p>
          </div>
          <Link className="block" href={"/quiz"}>
            <Button>Iniciar Quiz!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
