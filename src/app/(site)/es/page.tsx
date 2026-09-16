import { HomePage } from "@/components/HomePage";
import dict from "@/content/aion-es.json";

export default function Page() {
  return <HomePage dict={dict} lang="es" />;
}
