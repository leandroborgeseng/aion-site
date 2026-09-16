import { HomePage } from "@/components/HomePage";
import dict from "@/content/aion-en.json";

export default function Page() {
  return <HomePage dict={dict} lang="en" />;
}
