"use client";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <div className="space-y-4">
        <div>
          <h1 className="font-bold text-3xl">
            Iniciar quiz sobre mulheres históricas
          </h1>
          <p className="text-muted-foreground">
            Este é um quiz com 5 perguntas, cada uma com 4 alternativas. No
            final, você verá sua pontuação!
          </p>
        </div>
        <Link className="block w-max" href={"/quiz"}>
          <Button>Iniciar Quiz!</Button>
        </Link>
      </div>
    </Container>
  );
}
