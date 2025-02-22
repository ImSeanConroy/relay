-- Up Migration

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(40) UNIQUE NOT NULL,
  fullname VARCHAR(30) NOT NULL,
  password VARCHAR(200) NOT NULL,
  profile_picture VARCHAR(200),
  status VARCHAR(30) DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Down Migration

DROP TABLE users;