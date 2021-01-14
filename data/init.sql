DROP TABLE IF EXISTS salesforce.contact;
DROP SEQUENCE IF EXISTS salesforce.contact_id_seq;
DROP SCHEMA IF EXISTS salesforce;

CREATE SCHEMA salesforce
    AUTHORIZATION postgres;

CREATE SEQUENCE salesforce.contact_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE salesforce.contact
(
    systemmodstamp timestamp without time zone,
    createddate timestamp without time zone,
    id integer NOT NULL DEFAULT nextval('salesforce.contact_id_seq'::regclass),
    sfid character varying(18) COLLATE pg_catalog."default",
    name character varying(80) COLLATE pg_catalog."default",
    ownerid character varying(18) COLLATE pg_catalog."default",
    isdeleted boolean,
    _hc_err text COLLATE pg_catalog."default",
    _hc_lastop character varying(32) COLLATE pg_catalog."default",
    firstname character varying(80) COLLATE pg_catalog."default",
    lastname character varying(80) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    phone character varying(255) COLLATE pg_catalog."default",
    mobilephone character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT contact_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)