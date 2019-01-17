STEP 1: CREATE A DB CALLED therma_solutions

STEP 2: RUN CMDS

CREATE TABLE "person" (
	"id" serial NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"access_level" integer,
	"type_of_cancer" integer,
	"active" BOOLEAN DEFAULT 't',
	"first_name" varchar,
	"last_name" varchar,
	"title" varchar,
	CONSTRAINT person_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "types_of_cancer" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"abbreviation" varchar NOT NULL,
	CONSTRAINT types_of_cancer_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- Need to get these codes ---
INSERT INTO types_of_cancer (name, abbreviation) 
VALUES ('Colorectal Cancer', 'CRC'), 
			('Appendix', 'Appendix'),
			('Gastric', 'Gastric'),
			('Ovarian', 'Ovarian'),
			('Mesothelioma', 'Meso'),
			('Pseudomyxoma Peritonei', 'PMP'),
			('Other', 'Other');

CREATE TABLE "event_options" (
	"id" serial NOT NULL,
	"name" varchar,
	"sort" integer,
	CONSTRAINT event_options_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO event_options (name, sort) 
VALUES 
	('Abcess', 1),
	('Anastomotic Leakage', 2),
	('Anemia', 3),
	('Bleeding', 4),
	('Cardiac', 5),
	('Electrolyte Disorder', 6),
	('Fistula', 7),
	('Gastroparesis', 8),
	('Ileus', 9),
	('Other Infection', 10),
	('Pneumonia', 11),
	('Pulmonary Embolism', 12),
	('Urinoma', 13),
	('Urinary Tract Infection', 14),
	('Wound Dehiscense', 15),
	('Wound Infection', 16),
	('Other Event', 17);

CREATE TABLE "patients" (
	"id" serial NOT NULL,
	"toc_id" integer,
	"user_id" integer,
	"patient_no" varchar,
	"dob" DATE,
	"gender" varchar,
	"referral_date" DATE,
	"hipec_date" DATE,
	"diagnosis_date" DATE,
	"sensor" BOOLEAN,
	"hospital_telephone" varchar,
	"referring_doctor" varchar,
	"notes" varchar,
	"current_status" integer,
	"current_date" DATE,
	"current_time" TIME,
	"last_contact_date" DATE,
	"date_of_death" DATE,
	"alive_on_date" DATE,
	"interval_prime_surgery" INTEGER,
	"survival_hipec_death" INTEGER,
	"survival_hipec_last_contact" INTEGER,
	"interval_diagnosis_pc_hipec" INTEGER,
	CONSTRAINT patients_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "primary_tumor" (
	"id" serial NOT NULL,
	"patient_id" integer UNIQUE NOT NULL,
	"date_primary_diagnosis" DATE,
	"primary_location" varchar,
	"tumor_type" varchar,
	"t" varchar,
	"n" varchar,
	"m" varchar,
	"m_location" varchar,
	"differentiation" varchar,
	"mucinous" varchar,
	"date_prime_surgery" DATE,
	"intervention_type" varchar,
	"setting" varchar,
	"reason_acute" varchar,
	"prime_tumor_surgery" varchar,
	"adj_chemotherapy" varchar,
	"type" varchar,
	"biological" varchar,
	"notes" varchar,
	"chemo_type_1" varchar,
	"chemo_type_2" varchar,
	"adj_chemotherapy_type" varchar,
	CONSTRAINT primary_tumor_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "intake" (
	"id" serial NOT NULL,
	"patient_id" integer UNIQUE NOT NULL,
	"weight_kg" varchar,
	"length_m" varchar,
	"bmi_auto" double precision,
	"crp" varchar,
	"ca125" varchar,
	"leucocyte" varchar,
	"smoking" varchar,
	"diabetes" varchar,
	"insulin_dependent" varchar,
	"cardiovascular" varchar,
	"hypertension" varchar,
	"stoma_pre_hipec" varchar,
	"stoma_type" varchar,
	"neo_adjuvant_chemo" varchar,
	"neo_adjuvant_chemo_type" integer,
	"biological" integer,
	"notes" varchar,
	"diagnostic_scopy" varchar,
	"date_scopy" DATE,
	"scopy_conclusion" varchar,
	"scopy_notes" varchar,
	"syn_metachronous" integer,
	"date_diagnosis_pc" DATE,
	"assessment_of_pss" varchar,
	"asa_score" integer,
	"date_time_stamp" TIMESTAMP,
	"date" DATE,
	"pss_score" integer,
	CONSTRAINT intake_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "psdss" (
	"id" serial NOT NULL,
	"patient_id" integer UNIQUE NOT NULL,
	"clinical" integer,
	"pci" integer,
	"histology" integer,
	"synchronous_liver_treatment" BOOLEAN,
	"timing" integer,
	"date_treatment" DATE,
	"treatment_type" integer,
	"notes" varchar,
	"total" integer,
	CONSTRAINT psdss_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "intervention" (
	"id" serial NOT NULL,
	"patient_id" integer UNIQUE NOT NULL,
	"surgeon_1" varchar,
	"surgeon_2" varchar,
	"surgeon_3" varchar,
	"nrhipec" varchar,
	"hipec_type" integer,
	"reason_oc" integer,
	"pci_score" varchar,
	"anastomosis" BOOLEAN,
	"anastomosis_number" integer,
	"revision_stoma" BOOLEAN,
	"stoma_post_hipec" BOOLEAN,
	"stoma_post_hipec_type" integer,
	"bloodloss" varchar,
	"time" varchar,
	"hipec_regiment" integer,
	"duration" varchar,
	"volume" varchar,
	"concentration" varchar,
	"r_score" integer,
	"pci_0" integer,
	"pci_1" integer,
	"pci_2" integer,
	"pci_3" integer,
	"pci_4" integer,
	"pci_5" integer,
	"pci_6" integer,
	"pci_7" integer,
	"pci_8" integer,
	"pci_9" integer,
	"pci_10" integer,
	"pci_11" integer,
	"pci_12" integer,
	CONSTRAINT intervention_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "postop" (
	"id" serial NOT NULL,
	"patient_id" integer UNIQUE NOT NULL,
	"icu_stays" integer,
	"mcu_stays" integer,
	"hospital_stays" integer,
	"notes" varchar,
	"serious_adverse_event" BOOLEAN,
	"score" varchar,
	"reoperation" BOOLEAN,
	"hospital_mortality" BOOLEAN,
	"status_at_discharge" integer,
	"discharge_notes" varchar,
	CONSTRAINT postop_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "adverse_events" (
	"id" serial NOT NULL,
	"patient_id" integer NOT NULL,
	"event_options_id" integer NOT NULL,
	"clavien_score" integer,
	CONSTRAINT adverse_events_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "follow_up" (
	"id" serial NOT NULL,
	"patient_id" integer UNIQUE NOT NULL,
	"adjuvant_chemo" BOOLEAN,
	"adjuvant_chemo_type" integer,
	"biological" integer,
	"evidence_of_disease" BOOLEAN,
	"last_contact" DATE,
	"date_of_death" DATE,
	"notes" text,
	CONSTRAINT follow_up_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "follow_up_history" (
  "id" serial NOT NULL,
  "patient_id" integer NOT NULL,
  "date" DATE,
  "evidence_of_disease" BOOLEAN DEFAULT 'f',
  "follow_up_notes" varchar,
	"recurrence" BOOLEAN DEFAULT 'f',
  "cea" varchar,
  "rec_modality" integer,
  "syst_location" integer,
  "treatment" integer,
  "date_treatment" DATE,
  "status" integer,
  "treatment_notes" varchar,
  "location" integer,
  CONSTRAINT follow_up_history_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "pathology_op_notes" (
	"id" serial NOT NULL,
	"patient_id" integer NOT NULL REFERENCES patients(id),
	"pathology_report" varchar,
	"date_completed" TIMESTAMP DEFAULT now(),
	"title" varchar,
	"first_name" varchar,
	"last_name" varchar,
	CONSTRAINT pathology_op_notes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "operative_op_notes" (
    "id" SERIAL NOT NULL,
    "patient_id" integer NOT NULL REFERENCES patients(id),
    "operative_notes" varchar,
        "date_completed" TIMESTAMP DEFAULT now(),
        "title" varchar,
        "first_name" varchar,
        "last_name" varchar,
CONSTRAINT operative_op_notes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "resections" (
	"id" serial NOT NULL,
	"intervention_id" integer NOT NULL REFERENCES "intervention"("id") UNIQUE,
	"ovaries" BOOLEAN DEFAULT 'f',
	"uterus" BOOLEAN DEFAULT 'f',
	"omentum" BOOLEAN DEFAULT 'f',
	"rectum" BOOLEAN DEFAULT 'f',
	"sigmoid" BOOLEAN DEFAULT 'f',
	"left_colon" BOOLEAN DEFAULT 'f',
	"transverse_colon" BOOLEAN DEFAULT 'f',
	"right_colon" BOOLEAN DEFAULT 'f',
	"ileocaecal" BOOLEAN DEFAULT 'f',
	"appendix" BOOLEAN DEFAULT 'f',
	"duodenum" BOOLEAN DEFAULT 'f',
	"jejunum" BOOLEAN DEFAULT 'f',
	"ileum" BOOLEAN DEFAULT 'f',
	"gallbladder" BOOLEAN DEFAULT 'f',
	"stomach" BOOLEAN DEFAULT 'f',
	"spleen" BOOLEAN DEFAULT 'f',
	"diagphram_l" BOOLEAN DEFAULT 'f',
	"diagphram_r" BOOLEAN DEFAULT 'f',
	"pancreas" BOOLEAN DEFAULT 'f',
	"bladder" BOOLEAN DEFAULT 'f',
	"urether" BOOLEAN DEFAULT 'f',
	"lymphnodes" BOOLEAN DEFAULT 'f',
	"left_peritoneum" BOOLEAN DEFAULT 'f',
	"right_peritoneum" BOOLEAN DEFAULT 'f',
	"peritoneum" BOOLEAN DEFAULT 'f',
	"pelvis" BOOLEAN DEFAULT 'f',
	CONSTRAINT resections_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "person" ADD CONSTRAINT "person_fk0" FOREIGN KEY ("type_of_cancer") REFERENCES "types_of_cancer"("id");

ALTER TABLE "patients" ADD CONSTRAINT "patients_fk0" FOREIGN KEY ("toc_id") REFERENCES "types_of_cancer"("id");
ALTER TABLE "patients" ADD CONSTRAINT "patients_fk1" FOREIGN KEY ("user_id") REFERENCES "person"("id");

ALTER TABLE "primary_tumor" ADD CONSTRAINT "primary_tumor_fk0" FOREIGN KEY ("patient_id") REFERENCES "patients"("id");

ALTER TABLE "intake" ADD CONSTRAINT "intake_fk0" FOREIGN KEY ("patient_id") REFERENCES "patients"("id");

ALTER TABLE "psdss" ADD CONSTRAINT "psdss_fk0" FOREIGN KEY ("patient_id") REFERENCES "patients"("id");

ALTER TABLE "intervention" ADD CONSTRAINT "intervention_fk0" FOREIGN KEY ("patient_id") REFERENCES "patients"("id");

ALTER TABLE "postop" ADD CONSTRAINT "postop_fk0" FOREIGN KEY ("patient_id") REFERENCES "patients"("id");

ALTER TABLE "follow_up" ADD CONSTRAINT "follow_up_fk0" FOREIGN KEY ("patient_id") REFERENCES "patients"("id");

ALTER TABLE "follow_up_history" ADD CONSTRAINT "follow_up_history_id_fk0" FOREIGN KEY ("patient_id") REFERENCES "follow_up"("patient_id");

ALTER TABLE "adverse_events" ADD CONSTRAINT "adverse_events_fk0" FOREIGN KEY ("patient_id") REFERENCES "postop"("patient_id");

ALTER TABLE "adverse_events" ADD CONSTRAINT "adverse_events_fk0" FOREIGN KEY ("patient_id") REFERENCES "postop"("patient_id");

ALTER TABLE "pathology_op_notes" ADD CONSTRAINT "pathology_op_notes_fk0" FOREIGN KEY ("patient_id") REFERENCES "patients"("id");
ALTER TABLE "operative_op_notes" ADD CONSTRAINT "operative_op_notes_fk0" FOREIGN KEY ("patient_id") REFERENCES "patients"("id");

ALTER TABLE "resections" ADD CONSTRAINT "resections_fk0" FOREIGN KEY ("intervention_id") REFERENCES "intervention"("id");
