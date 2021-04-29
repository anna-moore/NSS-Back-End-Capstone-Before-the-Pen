Use [master]
GO
IF db_id('BeforethePen') IS NULL
	CREATE DATABASE [BeforethePen]
GO
USE [BeforethePen]
GO 

DROP TABLE IF EXISTS [UserProfile]
DROP TABLE IF EXISTS [Monthly]
DROP TABLE IF EXISTS [MonthlyLayout]
DROP TABLE IF EXISTS [Layout]
DROP TABLE IF EXISTS [Resources]
DROP TABLE IF EXISTS [TypeOfMedia]

CREATE TABLE [UserProfile] (
  [id] integer PRIMARY KEY NOT NULL,
  [firebaseId] nvarchar(28) NOT NULL,
  [userName] nvarchar(255) NOT NULL,
  [firstName] nvarchar(255) NOT NULL,
  [lastName] nvarchar(255) NOT NULL,
  [email] nvarchar(255) NOT NULL,
  [createDateTime] datetime NOT NULL,
  [imageLocation] nvarchar(255)
)
GO

CREATE TABLE [Monthly] (
  [id] integer PRIMARY KEY NOT NULL,
  [userProfileId] integer NOT NULL,
  [month] nvarchar(255) NOT NULL,
  [year] integer NOT NULL
)
GO

CREATE TABLE [MonthlyLayout] (
  [id] integer PRIMARY KEY NOT NULL,
  [monthlyId] integer NOT NULL,
  [layoutId] integer NOT NULL,
  [inspiredBy] nvarchar(255),
  [imageURL] nvarchar(255),
  [resourceId] integer,
  [style] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Layout] (
  [id] integer PRIMARY KEY NOT NULL,
  [UserProfileId] integer NOT NULL,
  [type] nvarchar(255) NOT NULL,
  [timeEstimate] integer,
  [description] nvarchar(255)
)
GO

CREATE TABLE [Resources] (
  [id] integer PRIMARY KEY NOT NULL,
  [UserProfileId] integer NOT NULL,
  [typeOfMedia] integer NOT NULL,
  [URL] nvarchar(255) NOT NULL,
  [imageURL] nvarchar(255)
)
GO

CREATE TABLE [TypeOfMedia] (
  [id] integer PRIMARY KEY NOT NULL,
  [type] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Monthly] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Resources] ADD FOREIGN KEY ([TypeOfMedia]) REFERENCES [TypeOfMedia] ([id])
GO

ALTER TABLE [MonthlyLayout] ADD FOREIGN KEY ([MonthlyId]) REFERENCES [Monthly] ([id])
GO

ALTER TABLE [MonthlyLayout] ADD FOREIGN KEY ([LayoutId]) REFERENCES [Layout] ([id])
GO

ALTER TABLE [MonthlyLayout] ADD FOREIGN KEY ([ResourceId]) REFERENCES [Resources] ([id])
GO

ALTER TABLE [Resources] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([id])
GO