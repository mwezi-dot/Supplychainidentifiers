CREATE TABLE IF NOT EXISTS sensor_device (
  id UUID PRIMARY KEY,
  external_id TEXT UNIQUE NOT NULL,
  kind TEXT NOT NULL,
  installed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pole_asset (
  id UUID PRIMARY KEY,
  pole_code TEXT UNIQUE NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lon DOUBLE PRECISION NOT NULL,
  fiber_segment_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sensor_reading (
  id BIGSERIAL PRIMARY KEY,
  device_id UUID NOT NULL REFERENCES sensor_device(id),
  pole_id UUID REFERENCES pole_asset(id),
  tilt_x DOUBLE PRECISION,
  tilt_y DOUBLE PRECISION,
  vibration DOUBLE PRECISION,
  temperature_c DOUBLE PRECISION,
  observed_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blockchain_anchor (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  payload_sha256 TEXT NOT NULL,
  tx_hash TEXT,
  chain_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  anchored_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
