Use [master]
GO
IF db_id('BeforethePen') IS NULL
	CREATE DATABASE [BeforethePen]
GO
USE [BeforethePen]
GO 

DROP TABLE IF EXISTS [MonthlyLayout]
DROP TABLE IF EXISTS [Layout]
DROP TABLE IF EXISTS [Monthly]
DROP TABLE IF EXISTS [Resource]
DROP TABLE IF EXISTS [TypeOfMedia]
DROP TABLE IF EXISTS [SpotlightLayout]
DROP TABLE IF EXISTS [HomepageResources]
DROP TABLE IF EXISTS [UserProfile]

CREATE TABLE [UserProfile] (
  [id] integer IDENTITY PRIMARY KEY NOT NULL,
  [firebaseId] nvarchar(28) NOT NULL,
  [displayName] nvarchar(255) NOT NULL,
  [firstName] nvarchar(255) NOT NULL,
  [lastName] nvarchar(255) NOT NULL,
  [email] nvarchar(255) NOT NULL,
  [DateCreated] datetime NOT NULL,
  [imageURL] nvarchar(255)
)
GO

CREATE TABLE [Monthly] (
  [id] integer IDENTITY PRIMARY KEY NOT NULL,
  [userProfileId] integer NOT NULL,
  [month] nvarchar(255) NOT NULL,
  [year] integer NOT NULL
)
GO

CREATE TABLE [MonthlyLayout] (
  [id] integer IDENTITY PRIMARY KEY NOT NULL,
  [monthlyId] integer NOT NULL,
  [layoutId] integer NOT NULL,
  [inspiredBy] nvarchar(255),
  [imageURL] nvarchar(255),
  [resourceId] integer,
  [style] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Layout] (
  [id] integer IDENTITY  PRIMARY KEY NOT NULL,
  [UserProfileId] integer NOT NULL,
  [type] nvarchar(255) NOT NULL,
  [timeEstimate] integer,
  [description] nvarchar(255)
)
GO

CREATE TABLE [Resource] (
  [id] integer IDENTITY  PRIMARY KEY NOT NULL,
  [UserProfileId] integer NOT NULL,
  [typeOfMediaId] integer NOT NULL,
  [URL] nvarchar(255) NOT NULL,
  [imageURL] nvarchar(255)
)
GO

CREATE TABLE [TypeOfMedia] (
  [id] integer IDENTITY PRIMARY KEY NOT NULL,
  [type] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [SpotlightLayout](
  [id] integer IDENTITY PRIMARY KEY NOT NULL,
  [artist] nvarchar (255) NOT NULL,
  [videoURL] nvarchar (255),
  [artistProfolioURL] nvarchar (255),
  [imageURL] nvarchar (255)
)
GO

CREATE TABLE [HomepageResources](
	[id] integer IDENTITY PRIMARY KEY NOT NULL,
	[topic] nvarchar (255) NOT NULL,
	[URL] nvarchar (255) NOT NULL
)
GO

ALTER TABLE [Monthly] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Resource] ADD FOREIGN KEY ([TypeOfMediaId]) REFERENCES [TypeOfMedia] ([id])
GO

ALTER TABLE [MonthlyLayout] ADD FOREIGN KEY ([MonthlyId]) REFERENCES [Monthly] ([id])
GO

ALTER TABLE [MonthlyLayout] ADD FOREIGN KEY ([LayoutId]) REFERENCES [Layout] ([id])
GO

ALTER TABLE [MonthlyLayout] ADD FOREIGN KEY ([ResourceId]) REFERENCES [Resources] ([id])
GO

ALTER TABLE [Resource] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([id])
GO