-- =============================================
-- Portfolio Database Schema for Supabase
-- Run this in Supabase > SQL Editor
-- =============================================

-- PROFILE (single row)
create table if not exists profile (
  id                serial primary key,
  name              text not null default 'Jude Dela Cruz',
  title             text not null default 'Full Stack Developer',
  bio               text default '',
  bio2              text default '',
  bio3              text default '',
  location          text default 'Balagtas, Bulacan, Philippines',
  email             text default '',
  phone             text default '',
  github            text default '',
  linkedin          text default '',
  portfolio         text default '',
  available         boolean default true,
  years_experience  text default '8+',
  updated_at        timestamptz default now()
);

-- Seed with your data
insert into profile (id, name, title, bio, bio2, bio3, location, email, phone, github, linkedin, portfolio, available, years_experience)
values (
  1,
  'Jude Dela Cruz',
  'Full Stack Developer',
  'Experienced Full Stack Developer with 8+ years delivering enterprise-level web and desktop applications at AsianLand Strategies Corporation. Specialized in system architecture, billing logic, and ERP solutions.',
  'My work spans building complex systems from the ground up — from custom ERP platforms with advanced payment logic, to real estate billing engines, to QR-based access control systems. I take ownership of the full lifecycle: architecture, development, database design, and team coordination.',
  'I hold a BS in Mathematics (Major in Computer Science) from Bulacan State University and have been recognized with Supervisor of the Year (2024) and Staff of the Year — Software Developer (2021).',
  'Balagtas, Bulacan, Philippines',
  'judedelacruz2025@gmail.com',
  '0956-130-5511',
  'https://github.com/dev-judedel',
  'https://www.linkedin.com/in/jude-delacruz/',
  'https://dev-judedel.github.io/myportfolio/',
  true,
  '8+'
)
on conflict (id) do nothing;

-- PROJECTS
create table if not exists projects (
  id          serial primary key,
  "index"     text default '',
  name        text not null,
  "desc"      text default '',
  highlights  jsonb default '[]',
  tags        jsonb default '[]',
  status      text default 'Production',
  team        text default '',
  impact      text default '',
  accent      text default 'var(--blue)',
  github      text default '',
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

insert into projects ("index", name, "desc", highlights, tags, status, team, impact, accent, github, sort_order) values
('01', 'Enterprise ERP System',
  'Custom internal ERP built from scratch to support all company operations. Includes Inventory Management and a CRM with advanced interest/principal payment logic.',
  '["Led 4-developer team","Reduced manual processing time significantly","Inventory · CRM · Payment logic"]',
  '["Native PHP","MySQL","MVC Architecture"]',
  'Production', '4 devs', 'Company-wide', 'var(--blue)', 'https://github.com/dev-judedel', 1),

('02', 'Real Estate Billing System',
  'Phase 1: Desktop app (Python/GTK) for property management. Phase 2: Migrated to PHP web platform with automated e-SOA billing and POS module.',
  '["60% faster billing cycles","Eliminated physical mail costs","Automated billing computation engine"]',
  '["Python","GTK/Glade","PHP","Laravel","Pandas"]',
  'Production', 'Solo → Team', '60% faster billing', '#7c3aed', 'https://github.com/dev-judedel', 2),

('03', 'QR Gate Pass & Booking',
  'Multi-tenant system for amenities booking and QR-based gate access control across multiple subdivisions.',
  '["Online booking for amenities","QR code generation & validation","Multi-subdivision support"]',
  '["PHP Laravel","MySQL","QR Codes","Multi-tenant"]',
  'Production', '4 devs', 'Zero manual passes', 'var(--green)', 'https://github.com/dev-judedel', 3),

('04', 'BI Dashboards & DB Migration',
  'Real-time business intelligence dashboards for management and automated MySQL-to-PostgreSQL migration tools with validation and error handling.',
  '["Real-time data visualization","Automated migration with error handling","Zero-downtime deployment"]',
  '["Chart.js","Bootstrap","Python","MySQL","PostgreSQL"]',
  'Production', 'Solo', 'Zero-downtime migration', '#d97706', 'https://github.com/dev-judedel', 4);

-- SKILLS
create table if not exists skills (
  id          serial primary key,
  category    text not null,
  accent      text default 'var(--blue)',
  name        text not null,
  level       text check (level in ('Expert','Advanced','Proficient')) default 'Advanced',
  note        text default '',
  icon        text default '⚡',
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

insert into skills (category, accent, name, level, note, icon, sort_order) values
('Backend Development','var(--blue)','Python','Expert','Flask · Django · GTK · Pandas','🐍',1),
('Backend Development','var(--blue)','PHP','Expert','Native PHP · Laravel · REST APIs','🐘',2),
('Backend Development','var(--blue)','Laravel','Expert','MVC · Queues · APIs · Auth','🔴',3),
('Backend Development','var(--blue)','REST API','Advanced','Design · Docs · Integration','🔗',4),
('Backend Development','var(--blue)','Flask','Advanced','Microservices · Blueprints','⚗️',5),
('Database & Data','#7c3aed','MySQL','Expert','Queries · Stored Procs · Tuning','🗄️',6),
('Database & Data','#7c3aed','PostgreSQL','Advanced','Migration · Performance tuning','🐘',7),
('Database & Data','#7c3aed','Data Modeling','Advanced','BI · Reporting · Schema design','📊',8),
('Database & Data','#7c3aed','Pandas','Advanced','ETL · Data analysis · openpyxl','🐼',9),
('Frontend','#d97706','HTML / CSS','Advanced','Responsive · Semantic markup','🎨',10),
('Frontend','#d97706','JavaScript','Proficient','ES6+ · DOM manipulation','⚡',11),
('Frontend','#d97706','Bootstrap','Advanced','Responsive layouts','🅱️',12),
('Frontend','#d97706','Chart.js','Advanced','BI dashboards · Real-time charts','📈',13),
('Frontend','#d97706','Next.js','Proficient','App Router · TypeScript','▲',14),
('Tools & Practices','var(--green)','Git','Advanced','Branching · Code review · CI','🌿',15),
('Tools & Practices','var(--green)','System Design','Expert','ERP · Billing · Architecture','🏗️',16),
('Tools & Practices','var(--green)','Team Lead','Expert','Mentorship · Planning · Reviews','👥',17),
('Tools & Practices','var(--green)','Linux','Proficient','CLI · Shell scripting','🐧',18);

-- EXPERIENCE
create table if not exists experience (
  id          serial primary key,
  title       text not null,
  org         text default '',
  period      text default '',
  duration    text default '',
  "current"   boolean default false,
  points      jsonb default '[]',
  tags        jsonb default '[]',
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

insert into experience (title, org, period, duration, "current", points, tags, sort_order) values
('Lead Software Developer', 'AsianLand Strategies Corporation', '2017 – Present', '8+ years', true,
  '["Lead a team of developers designing and maintaining enterprise-level systems","Architect full-stack applications using Python, PHP, MySQL, and PostgreSQL","Design and optimize databases for performance, accuracy, and scalability","Translate complex business requirements into technical solutions","Conduct code reviews, mentoring, and technical planning sessions"]',
  '["Python","PHP","MySQL","PostgreSQL","Laravel","Team Lead"]',
  1);

-- AWARDS
create table if not exists awards (
  id          serial primary key,
  title       text not null,
  sub         text default '',
  year        text default '',
  org         text default '',
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

insert into awards (title, sub, year, org, sort_order) values
('Supervisor of the Year', 'IT Supervisor', '2024', 'AsianLand Strategies Corporation', 1),
('Staff of the Year', 'Software Developer', '2021', 'AsianLand Strategies Corporation', 2);

-- =============================================
-- Row Level Security (RLS)
-- Enable RLS so anon key can only read data.
-- The service role key (used in API routes) bypasses RLS.
-- =============================================
alter table profile    enable row level security;
alter table projects   enable row level security;
alter table skills     enable row level security;
alter table experience enable row level security;
alter table awards     enable row level security;

-- Allow public read on all tables
create policy "public read profile"    on profile    for select using (true);
create policy "public read projects"   on projects   for select using (true);
create policy "public read skills"     on skills     for select using (true);
create policy "public read experience" on experience for select using (true);
create policy "public read awards"     on awards     for select using (true);
