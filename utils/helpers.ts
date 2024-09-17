export const mongoErrrors = {
    "password": {
        "name": "PasswordError",
        "message": "Entre 8 y 20 caracteres, incluir mayúscula,minúsculas y un número, sin caracteres especiales"
    },
        "passwordsMatch": {
        "name": "PasswordsMatchError",
        "message": "Las contraseñas no coinciden"
    },
    "11000": {
        "name": "DuplicateKey",
        "message": "Registro duplicado."
    },
    "66": {
        "name": "ImmutableField",
        "message": "El campo no puede ser modificado una vez establecido."
    },
    "50": {
        "name": "ExceededTimeLimit",
        "message": "Se ha excedido el tiempo límite para la operación."
    },
    "121": {
        "name": "DocumentValidationFailure",
        "message": "El documento no cumple con el esquema de validación."
    },
    "2": {
        "name": "BadValue",
        "message": "Un valor proporcionado no es válido."
    },
    "13": {
        "name": "Unauthorized",
        "message": "Permiso denegado para realizar la operación."
    },
    "18": {
        "name": "AuthenticationFailed",
        "message": "Error en la autenticación con MongoDB."
    },
    "10334": {
        "name": "DiskFull",
        "message": "Espacio insuficiente en disco."
    },
    "11600": {
        "name": "InterruptedAtShutdown",
        "message": "La operación fue interrumpida debido a un apagado del servidor."
    },
    "11601": {
        "name": "Interrupted",
        "message": "La operación fue interrumpida."
    },
    "16020": {
        "name": "Location16020",
        "message": "Error en la agregación. Revise la estructura de la consulta."
    },
    "8000": {
        "name": "AtlasError",
        "message": "Error general en MongoDB Atlas."
    },
    "59": {
        "name": "WriteConflict",
        "message": "Conflicto de escritura detectado."
    },
    "10003": {
        "name": "CannotCreateIndex",
        "message": "No se puede crear el índice debido a una configuración o estado incorrecto."
    },
    "112": {
        "name": "WriteConcernFailed",
        "message": "Error en la escritura debido a un problema con la confirmación (write concern)."
    },
    "2001": {
        "name": "Location2001",
        "message": "Error relacionado con el almacenamiento en MongoDB."
    },
    "88": {
        "name": "ShutdownInProgress",
        "message": "Operación cancelada debido a que el servidor está apagándose."
    },
    "96": {
        "name": "NamespaceNotFound",
        "message": "La colección o base de datos especificada no fue encontrada."
    },
    "202": {
        "name": "ExceededMemoryLimit",
        "message": "La operación ha excedido el límite de memoria permitido."
    },
    "240": {
        "name": "CursorKilled",
        "message": "El cursor fue destruido antes de completar la operación."
    },
    "50000": {
        "name": "UserDefinedError",
        "message": "Error definido por el usuario en una operación personalizada."
    },
    "11602": {
        "name": "InterruptedDueToStepDown",
        "message": "La operación fue interrumpida porque el nodo se convirtió en no primario."
    },
    "311": {
        "name": "JSInterpreterFailure",
        "message": "Error en la ejecución del código JavaScript en una operación."
    },
    "7": {
        "name": "HostNotFound",
        "message": "No se pudo encontrar el host especificado."
    },
    "6": {
        "name": "HostUnreachable",
        "message": "El host no es accesible."
    },
    "17407": {
        "name": "Location17407",
        "message": "Error relacionado con la configuración de replicación."
    },
    "29": {
        "name": "SnapshotUnavailable",
        "message": "No se pudo acceder a una instantánea requerida."
    }
};