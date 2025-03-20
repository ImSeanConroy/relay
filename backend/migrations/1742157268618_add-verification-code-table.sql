-- Up Migration

ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false;

CREATE TABLE verification_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);

-- Down Migration

ALTER TABLE users DROP COLUMN email_verified;

DROP TABLE verification_codes
