

CREATE TABLE member(
id SERIAL PRIMARY KEY,
username VARCHAR(15) NOT NULL UNIQUE, 
password VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
saved_trips INTEGER []
);

CREATE TABLE trip(
id SERIAL PRIMARY KEY,
title VARCHAR(1000) NOT NULL, 
destination VARCHAR(1000) NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
member_id INT NOT NULL, 
place_id VARCHAR(1000),
locationphotos VARCHAR [],
dates_known  VARCHAR(1000),
FOREIGN KEY (member_id) REFERENCES member(id)
);

CREATE TABLE activity(
id SERIAL PRIMARY KEY,
title VARCHAR(1000) NOT NULL, 
location VARCHAR(1000) NOT NULL,
trip_id INT NOT NULL, 
image_url VARCHAR(1000),
url VARCHAR(1000),
latitude DECIMAL,
longitude DECIMAL,
rating DECIMAL,
review_count INT,
FOREIGN KEY (trip_id) REFERENCES trip(id)
);

-- SELECT * FROM trip WHERE start_date >'2023-01-31'::date AND end_date <= '2024-02-01'::date

-- SELECT * FROM trip WHERE '2025-02-05' BETWEEN start_date AND end_date

-- SELECT * FROM member WHERE 6=ANY(saved_trips)

--  SELECT trip.destination FROM trip JOIN member ON member.id=1 AND trip.id=ANY(saved_trips)

-- MY trips:
--  SELECT * FROM trip WHERE member_id=1 

-- MY saved_trips:
--  SELECT *
--   FROM trip
--     JOIN member ON member.id=1 OR trip.id=ANY(saved_trips)




-- Combined trips:
-- SELECT trip.id,title,destination,start_date,end_date,member_id,place_id,dates_known,locationphotos FROM trip where member_id=1
-- UNION 
-- SELECT trip.id,title,destination,start_date,end_date,member_id,place_id,dates_known,locationphotos FROM trip JOIN member ON member.id=1 AND trip.id=ANY(saved_trips)


 