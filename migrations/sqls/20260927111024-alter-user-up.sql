ALTER TABLE Users
ADD column otp INTEGER NULL,
    ADD column otp_expiry TIMESTAMPTZ,
    ADD column email_verification VARCHAR(255) NULL;