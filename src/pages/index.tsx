// src/pages/index.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../app/styles/Login.module.css"; // Importação do CSS Module

// Definindo a interface para os dados do formulário
interface LoginFormInputs {
	email: string;
	password: string;
}

// Definindo o esquema de validação com Yup
const schema = yup.object().shape({
	email: yup.string().email("Email inválido").required("Email é obrigatório"),
	password: yup
		.string()
		.min(6, "Mínimo 6 caracteres")
		.required("Senha é obrigatória"),
});

function Login() {
	// Definindo o useForm com TypeScript
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(schema),
	});

	const router = useRouter();

	// Definindo o tipo do onSubmit com SubmitHandler
	const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
		try {
			const response = await axios.post(
				"http://localhost:3000/auth/login",
				data
			);
			localStorage.setItem("token", response.data.access_token);
			router.push("/dashboard");
		} catch (error) {
			alert("Erro no login, verifique suas credenciais.");
		}
	};

	return (
		<div className={styles.loginPage}>
			{/* Seção da esquerda com o conteúdo do banner */}
			<div className={styles.bannerContent}>
				<h2>AGENDAMENTO</h2>
				<h2>CONTROLE</h2>
				<h2>COMUNICAÇÃO</h2>
				<h2>RECEITAS</h2>
				<h2>PARECERES</h2>
			</div>

			{/* Seção da direita com o formulário de login */}
			<div className={styles.loginForm}>
				{/* Logo do Clin Plus */}
				<div className={styles.logo}>
					<Image
						src="/images/logo.svg"
						alt="Clin Plus Logo"
						width={150}
						height={50}
					/>
				</div>

				{/* Formulário de login */}
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Campo de email */}
					<input
						type="email"
						placeholder="Nome do usuário ou e-mail"
						{...register("email")}
						className={styles.inputField} // Classe de estilo aplicada ao campo de email
					/>
					<p className={styles.errorMessage}>{errors.email?.message}</p>{" "}
					{/* Exibe erro de validação */}
					{/* Campo de senha */}
					<input
						type="password"
						placeholder="Senha"
						{...register("password")}
						className={styles.inputField} // Classe de estilo aplicada ao campo de senha
					/>
					<p className={styles.errorMessage}>{errors.password?.message}</p>{" "}
					{/* Exibe erro de validação */}
					{/* Botão de submissão */}
					<button type="submit" className={styles.submitButton}>
						Entrar
					</button>
					{/* Login social */}
					<div className={styles.socialLogin}>
						<p>OU</p>
						<button
							className={styles.googleLogin}
							type="button"
							onClick={() =>
								(window.location.href = "http://localhost:3000/auth/google")
							}
						>
							Entrar com Google
						</button>
					</div>
					{/* Links de cadastro e recuperação de senha */}
					<p>
						Não tem uma conta?{" "}
						<a href="/register" className={styles.link}>
							Cadastre-se
						</a>
					</p>
					<p>
						<a href="/forgot-password" className={styles.link}>
							Esqueceu a senha?
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
