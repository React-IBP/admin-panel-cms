 export const segmenter= (slug:string) => {
  // Convertir a minúsculas
  slug = slug.toLowerCase();
  // Reemplazar caracteres especiales
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina acentos
  // Reemplazar cualquier carácter que no sea una letra, número o espacio por un guion
  slug = slug.replace(/[^a-z0-9\s-]/g, "");
  // Reemplazar uno o más espacios o guiones por un solo guion
  slug = slug.replace(/[\s-]+/g, "-");
  // Eliminar guiones al principio o al final
  slug = slug.replace(/^-+|-+$/g, "");
  return slug;
};

export const time = () => {
  return Math.floor(Date.now() / 1000); // Devuelve el timestamp Unix actual en segundos
};

