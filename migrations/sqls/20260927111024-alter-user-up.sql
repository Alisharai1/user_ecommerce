ALTER TABLE Users
ADD column otp VARCHAR(255) NULL,
    ADD column otp_expiry TIMESTAMPTZ,
    ADD column email_verification BOOLEAN DEFAULT FALSE;