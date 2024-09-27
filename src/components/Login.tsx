// src/app/components/Login.tsx
import Logo from "../images/logo.svg";
import WomanDoctor from "../images/womanDoctor.svg";
import ManDoctor from "../images/manDoctor.svg";
import styles from "..Login.module.css"; // Importando o CSS específico para o login

export default function Login() {
	return (
		<div className={styles.loginContainer}>
			<div className={styles.leftSection}>
				<div className={styles.logo}>
					<Logo /> {/* Agora o SVG é um componente React */}
				</div>
				<h2>AGENDAMENTO</h2>
				<h2>CONTROLE</h2>
				<h2>COMUNICAÇÃO</h2>
				<h2>RECEITAS</h2>
				<h2>PARECERES</h2>
				<div className={styles.imageContainer}>
					<WomanDoctor className={styles.doctorImage} />
					<ManDoctor className={styles.doctorImage} />
				</div>
				<p className={styles.tagline}>TUDO EM UM ÚNICO LUGAR</p>
			</div>

			<div className={styles.rightSection}>{/* Formulário de login */}</div>
		</div>
	);
}
