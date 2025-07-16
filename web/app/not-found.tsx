import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold">404 - Strona nie znaleziona</h1>
      <p className="my-4 ">Ups! Nie mogliśmy znaleźć tej strony.</p>
      <Button asChild>
        <Link href="/dashboard">Wróc do dashboarda</Link>
      </Button>
    </div>
  );
}