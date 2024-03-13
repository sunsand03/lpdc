import Image from "next/image";
import styles from "./page.module.css";
import Menu from "./components/Menu";

export default function Home() {
  return (
    <main>
      <Menu/>
     <h1>Dashboard</h1>
     <h2>Dernière commande</h2>
    </main>
  );
}
