// Definición de un tipo global
interface UserProps {
     mongoId: string,
     email: string,
     firstName: string,
     lastName: string,
     image: string,
     date: Date,
     active: boolean,
     handleDelete: (id: string) => void,
     roll: string
}

interface SegmenterProps {
     slug: string
}

interface ArticleProps{
     title: string;
     authors: string;
     description: string;
     slug: string;
     section: string;
     image?: File;
     content: string; 
     status:string; 
}

interface ParamsUserProps {
     params: { id: any; };
     firstName: string;
     lastName: string;
     email: string;
     image: string;
     roll: string;
     password: string;
     confirmPassword: string;
}

interface ErrorDetails {
     keyValue: Record<string, any>; // Ajusta el tipo según el contenido esperado
}

interface ErrorsState {
     error?: ErrorDetails;
     [key: string]: any; // Para permitir otros campos en el objeto de errores
}
interface TitleComponentContextProps {
     titleComponent: string;
     setTitle: (title: string) => string;
}   