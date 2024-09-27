// src/pages/index.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image"; // Next.js Image component
import "../styles/Login.css"; // Estilos específicos para a tela de login

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
		<div className="login-page">
			<div className="banner">
				<Image
					src="/images/banner-image.svg"
					alt="Banner"
					width={300}
					height={500}
				/>
				<div className="banner-content">
					<h2>AGENDAMENTO</h2>
					<h2>CONTROLE</h2>
					<h2>COMUNICAÇÃO</h2>
					<h2>RECEITAS</h2>
					<h2>PARECERES</h2>
				</div>
			</div>
			<div className="login-form">
				<div className="logo">
					<Image
						src="/images/clin-plus-logo.svg"
						alt="Clin Plus Logo"
						width={150}
						height={50}
					/>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="email"
						placeholder="Nome do usuário ou e-mail"
						{...register("email")}
					/>
					<p>{errors.email?.message}</p>
					<input
						type="password"
						placeholder="Senha"
						{...register("password")}
					/>
					<p>{errors.password?.message}</p>
					<button type="submit">Entrar</button>
					<div className="social-login">
						<p>OU</p>
						<button className="google-login">Entrar com Google</button>
					</div>
					<p>
						Não tem uma conta? <a href="/register">Cadastre-se</a>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
