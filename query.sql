CREATE TABLE estudiantes (
    id_estudiante INT PRIMARY KEY,
    nom_estudiante VARCHAR(50),
    ape_estudiante VARCHAR(50),
    estrato INT,
    genero_estudiante VARCHAR(10),
    ciudad_nac VARCHAR(50),
    fecha_nac DATE,
    direccion VARCHAR(100)
);

CREATE TABLE matriculas (
    id_matricula INT PRIMARY KEY,
    id_estudiante INT,
    id_asignatura INT,
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
    FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id_asignatura)
);

CREATE TABLE asignaturas (
    id_asignatura INT PRIMARY KEY,
    id_profesor INT,
    id_programa INT,
    nom_asignatura VARCHAR(50),
    creditos INT,
    FOREIGN KEY (id_programa) REFERENCES programas(id_programa),
    FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor)
);

CREATE TABLE horarios (
    id_horario INT PRIMARY KEY,
    id_asignatura INT,
    id_aula INT,
    dia DATE, 
    hora_inicio TIME,
    hora_fin TIME,
    FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id_asignatura),
    FOREIGN KEY (id_aula) REFERENCES aulas(id_aula)
);

CREATE TABLE aulas (
    id_aula INT PRIMARY KEY,
    nom_aula VARCHAR(50),
    ubicacion VARCHAR(50),
    capacidad INT,
    tipo VARCHAR(50)
);

CREATE TABLE programas (
    id_programa INT PRIMARY KEY,
    programa VARCHAR(50),
    facultad VARCHAR(50)
);

CREATE TABLE grupos (
    id_grupo INT PRIMARY KEY,
    id_profesor INT,
    id_asignatura INT,
    grupo VARCHAR(50),
    num_estudiantes INT,
    FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor)
);

CREATE TABLE profesores (
    id_profesor INT PRIMARY KEY,
    nom_profesor VARCHAR(50),
    ape_profesor VARCHAR(50),
    titulo VARCHAR(50),
    genero_profesor VARCHAR(10),
    area VARCHAR(50)
);
