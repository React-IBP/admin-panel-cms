import React from 'react'
interface ButtonProps {
    textButton: string,
    handleButton?: () => void,
    iconButton?: string | ''
    typeButton?: 'button' | "submit" | "reset",
    className?: string | ''
    disabled?: boolean | true,

}

export const ButtonDefault: React.FC<ButtonProps> = ({ typeButton, textButton, handleButton, iconButton, className, disabled }) => {
    return (
        <button onClick={handleButton} disabled={disabled} type={typeButton} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}>
            <i className={`${iconButton}`}></i>
            {' '} {textButton}
        </button>
    );
};

export const ButtonAlternative: React.FC<ButtonProps> = ({ typeButton, textButton, handleButton, iconButton, className, disabled }) => {
    return (
        <button onClick={handleButton} disabled={disabled} type={typeButton} className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${className}`}>
            <i className={`${iconButton}`}></i>
            {' '}   {textButton}
        </button>
    );
};

export const ButtonDark: React.FC<ButtonProps> = ({ typeButton, textButton, handleButton, iconButton, className, disabled }) => {
    return (
        <button onClick={handleButton} disabled={disabled} type={typeButton} className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${className}`}>
            <i className={`${iconButton}`}></i>
            {' '}   {textButton}
        </button>
    );
};

export const ButtonLight: React.FC<ButtonProps> = ({ typeButton, textButton, handleButton, iconButton, className, disabled }) => {
    return (
        <button onClick={handleButton} disabled={disabled} type={typeButton} className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${className}`}>
            <i className={`${iconButton}`}></i>
            {' '}   {textButton}
        </button>
    );
};

export const ButtonGreen: React.FC<ButtonProps> = ({ typeButton, textButton, handleButton, iconButton, className, disabled }) => {
    return (
        <button onClick={handleButton} disabled={disabled} type={typeButton} className={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${className}`}>
            <i className={`${iconButton}`}></i>
            {' '}   {textButton}
        </button>
    );
};

export const ButtonRed: React.FC<ButtonProps> = ({ typeButton, textButton, handleButton, iconButton, className, disabled }) => {
    return (
        <button onClick={handleButton} disabled={disabled} type={typeButton} className={`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${className}`}>
            <i className={`${iconButton}`}></i>
            {' '}   {textButton}
        </button>
    );
};

export const ButtonYellow: React.FC<ButtonProps> = ({ typeButton, textButton, handleButton, iconButton, className, disabled }) => {
    return (
        <button onClick={handleButton} disabled={disabled} type={typeButton} className={`focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 ${className}`}>
            <i className={`${iconButton}`}></i>
            {' '}   {textButton}
        </button>
    );
};

export const ButtonPurple: React.FC<ButtonProps> = ({ typeButton, textButton, handleButton, iconButton, className, disabled }) => {
    return (
        <button onClick={handleButton} disabled={disabled} type={typeButton} className={`focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ${className}`}>
            <i className={`${iconButton}`}></i>
            {' '}   {textButton}
        </button>
    );
};


export const ButtonWhite: React.FC<ButtonProps> = ({ typeButton, textButton, handleButton, iconButton, className, disabled }) => {
    return (
        <button onClick={handleButton} disabled={disabled} type={typeButton} className={`focus:outline-none text-black bg-white  hover:bg-gray-200 focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-white-600 dark:hover:bg-white-200 dark:focus:ring-white-900 ${className}`}>
            <i className={`${iconButton}`}></i>
            {' '}   {textButton}
        </button>
    );
};