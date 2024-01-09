drop schema microservices cascade
create schema microservices

create table microservices.event (
  event_id uuid,
  description text,
  price numeric,
  capacity integer
)

create table microservices.ticket(
  ticket_id uuid,
  event_id uuid,
  email text,
  status text
)

create table microservices.transaction (
  transaction_id uuid,
  ticket_id uuid,
  event_id uuid,
  tid text,
  price numeric,
  status text
)