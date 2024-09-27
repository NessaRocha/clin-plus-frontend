// src/pages/_app.tsx
import type { AppProps } from "next/app"; // Importando o tipo AppProps do Next.js
// Certifique-se de que o arquivo globals.css está no local correto
import "../app/styles/globals.css"; // Ajuste o caminho para refletir a estrutura correta

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
