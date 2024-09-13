// Definición de un tipo global
interface UserProps {
     mongoId: string,
     email: string,
     firstName: string,
     lastName: string,
     image: string,
     date: Date,
     active: boolean,
     handleDelete: (id:string) => void,
     roll: string
}

interface SegmenterProps {
     slug: string
}