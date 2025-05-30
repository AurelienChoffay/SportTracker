-- Créer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Créer un utilisateur de lecture seule pour les analytics (optionnel)
CREATE USER sporttracker_readonly WITH PASSWORD 'readonly123';
GRANT CONNECT ON DATABASE sporttracker TO sporttracker_readonly;
GRANT USAGE ON SCHEMA public TO sporttracker_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO sporttracker_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO sporttracker_readonly;
