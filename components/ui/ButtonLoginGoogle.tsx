'use client'
import React, { useEffect, useState } from 'react'
import { handleCredentialResponse } from '@/utils/loginHelper';
import styled from 'styled-components';
import Image from 'next/image';
import { assets } from "@/assets/assets";

 
const StyledDiv = styled.div`
	background: none;
	border-radius: 10px;
	border: 1px solid transparent;
	display: flex;
    justify-content:center;
    align-items:center;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.2em;
	margin-inline: auto;
	margin-top: 2.5rem;
	padding: 12px;
	text-align: center;
	user-select: none;
	vertical-align: middle;
	width: 100%; 
	&:hover {
		opacity: 0.9;
	}
`;

const StyledGoogleLoginButton = styled(StyledDiv)`
    --tw-bg-opacity: 1;
    background-color: rgb(30 58 138 / var(--tw-bg-opacity)) ;
	border-radius: 10px;
	border-color: 0px;
	color: white;
	position: relative;

	.g_id_signin {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		iframe {
			cursor: pointer;
			margin-inline: auto !important;
		}
	}
`;

const ButtonLoginGoogle = ({ toggleAuth }) => {
    useEffect(() => {
        // Cargar la librería de Google Identity Services
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        if (typeof window !== "undefined") {
            window.handleCredentialResponse = handleCredentialResponse;
            toggleAuth();
        }
        return () => {
            document.head.removeChild(script);
        };
    }, [toggleAuth]);

    const [clientId, setClientId] = useState('201077778150-4v8cil8kjjk5kbemrl0il0r855598bmq.apps.googleusercontent.com');

    useEffect(() => {
        setClientId(process.env.GOOGLE_CLIENT_ID || '');
    }, []);

    return (
        <>
            <StyledGoogleLoginButton>
                <div
                    id="g_id_onload"
                    data-client_id={`${clientId}`}
                    data-context="signin"
                    data-ux_mode="popup"
                    data-nonce=""
                    data-auto_prompt="false"
                    data-callback="handleCredentialResponse"
                ></div>
                <Image src={assets.google_white_icon} alt='Acceder con google' width={28} height={28} />
                <p className='ml-2'>Usar Google</p>
                <div
                    className="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="filled_blue"
                    data-text="signin_with"
                    data-size="medium"
                    data-logo_alignment="left"
                ></div>
            </StyledGoogleLoginButton>
        </>
    );
}

export default ButtonLoginGoogle;
