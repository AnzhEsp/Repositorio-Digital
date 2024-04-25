--Encoding UTF8

CREATE DATABASE repositorio;

CREATE TABLE comunidades (
  id_comunidad uuid DEFAULT gen_random_uuid (),
  nombre character varying(50) NOT NULL,
  CONSTRAINT comunidades_pkey PRIMARY KEY (id_comunidad),
  CONSTRAINT comunidades_nombre_key UNIQUE (nombre)
);
CREATE TABLE colecciones(
  id_coleccion uuid DEFAULT gen_random_uuid (),
  nombre CHARACTER VARYING(50) NOT NULL,
  id_comunidad uuid NOT NULL,
  CONSTRAINT coleccion_pkey PRIMARY KEY (id_coleccion),
  CONSTRAINT fk_comunidad FOREIGN KEY(id_comunidad) REFERENCES comunidades(id_comunidad) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT coleccion_nombre UNIQUE (nombre)
);
CREATE TABLE usuarios (
  uid uuid DEFAULT gen_random_uuid (),
  nombre character varying(50) NOT NULL,
  apellido_paterno character varying(60) NOT NULL,
  apellido_materno CHARACTER VARYING(60) NOT NULL,
  telefono character varying(15) NOT NULL,
  correo character varying(26) NOT NULL,
  contrasena character varying(255) NOT NULL,
  CONSTRAINT usuarios_pkey PRIMARY KEY (uid),
  CONSTRAINT usuarios_correo_key UNIQUE (correo)
);
CREATE TABLE documentos (
  id_documento uuid DEFAULT gen_random_uuid (),
  titulo text NOT NULL,
  fecha_publicacion date NOT NULL,
  editor text NOT NULL,
  citacion text NOT NULL,
  nombre_serie text NOT NULL,
  numero_serie text NOT NULL,
  identificadores text NOT NULL,
  tipo_documento character varying(50) NOT NULL,
  lenguaje character varying(10) NOT NULL,
  resumen TEXT NOT NULL,
  fecha_embargo DATE NOT NULL,
  id_coleccion uuid NOT NULL,
  uid uuid NOT NULL,
  CONSTRAINT documentos_pkey PRIMARY key (id_documento),
  CONSTRAINT fk_coleccion FOREIGN KEY(id_coleccion) REFERENCES colecciones(id_coleccion) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_uid FOREIGN KEY(uid) REFERENCES usuarios(uid) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE archivos(
  id_archivo uuid DEFAULT gen_random_uuid (),
  nombre TEXT NOT NULL,
  descripcion_archivo TEXT,
  motivo_embargo TEXT,
  base_data BYTEA NOT NULL,
  id_documento uuid,
  CONSTRAINT archivos_pk PRIMARY key (id_archivo),
  CONSTRAINT fk_documento FOREIGN KEY(id_documento) REFERENCES documentos(id_documento) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE autores(
  id_autor uuid DEFAULT gen_random_uuid (),
  nombre TEXT NOT NULL,
  apellido_paterno TEXT NOT NULL,
  apellido_materno TEXT NOT NULL,
  CONSTRAINT id_autor_pk PRIMARY key(id_autor)
);
CREATE TABLE palabras_claves(
  id_palabra_clave uuid DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  CONSTRAINT id_palabra_clave_pk PRIMARY key(id_palabra_clave)
);
CREATE TABLE documentos_completos(
  id_documento_completo uuid DEFAULT gen_random_uuid (),
  estado BOOLEAN DEFAULT false,
  id_documento uuid NOT NULL,
  id_palabra_clave uuid NOT NULL,
  id_autor uuid NOT NULL,
  CONSTRAINT documento_completo_pk PRIMARY key (id_documento_completo),
  CONSTRAINT fk_documento FOREIGN KEY(id_documento) REFERENCES documentos(id_documento) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_palabra_clave FOREIGN KEY(id_palabra_clave) REFERENCES palabras_claves(id_palabra_clave) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_autor FOREIGN KEY(id_autor) REFERENCES autores(id_autor) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE documentos_usuarios(
  id_doc_usuario uuid DEFAULT gen_random_uuid (),
  uid uuid NOT NULL,
  id_documento_completo uuid NOT NULL,
  CONSTRAINT documento_usuario_pk PRIMARY key (id_doc_usuario),
  CONSTRAINT fk_usuarioa FOREIGN KEY(uid) REFERENCES usuarios(uid) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_doc_completo FOREIGN KEY(id_documento_completo) REFERENCES documentos_completos(id_documento_completo) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO comunidades (nombre)
VALUES ('Contador Público'),
  ('Docentes'),
  ('Ingenería Elctrónica'),
  ('Ingenería en Gestión Empresarial'),
  ('Ingenería en Mecatrónica'),
  ('Ingenería en Sistemas computacionales'),
  ('Ingenería Industrial'),
  ('Maestría en Ingenería Administrativa');


--Cambiar el id_comunidad por uno que ya este generado
INSERT INTO colecciones (nombre, id_comunidad)
VALUES (
    'Desarrollo movil',
    '3e9ed253-5809-46dc-a78f-d925779c8b18'
  );
INSERT INTO colecciones (nombre, id_comunidad)
VALUES (
    'Desarrollo web',
    '3e9ed253-5809-46dc-a78f-d925779c8b18'
  );
  INSERT INTO colecciones (nombre, id_comunidad)
VALUES (
    'Machine Learning',
    '3e9ed253-5809-46dc-a78f-d925779c8b18'
  );
INSERT INTO colecciones (nombre, id_comunidad)
VALUES (
    'Sistemas Operativos',
    '3e9ed253-5809-46dc-a78f-d925779c8b18'
  );
  INSERT INTO colecciones (nombre, id_comunidad)
VALUES (
    'Internet de las cosas',
    '3e9ed253-5809-46dc-a78f-d925779c8b18'
  );
INSERT INTO colecciones (nombre, id_comunidad)
VALUES (
    'Redes',
    '3e9ed253-5809-46dc-a78f-d925779c8b18'
  );
INSERT INTO colecciones (nombre, id_comunidad)
VALUES (
    'Calidad del software (QA)',
    '3e9ed253-5809-46dc-a78f-d925779c8b18'
  );