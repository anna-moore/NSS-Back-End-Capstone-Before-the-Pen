

SET IDENTITY_INSERT [UserProfile] ON
    INSERT INTO [UserProfile]
      ([id], [FirebaseId], [DisplayName], [FirstName], [LastName], [Email], [ImageLocation],  [DateCreated])
    VALUES 
      (1, 'aitl29384', 'AnnaOcean', 'Anna', 'Ocean', 'ao@email.com', null,  '06-21-2020');
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Monthly] ON
  INSERT INTO [Monthly]
    ([Id], [UserProfileId], [Month], [Year])
  VALUES
    (1, 1, 'May', 2021);  
SET IDENTITY_INSERT [Monthly] OFF

SET IDENTITY_INSERT [Layout] ON
  INSERT INTO [Layout]
    ([Id], [UserProfileId], [Type], [TimeEstimate], [description])
  VALUES
    (1, 1,  'Cover Page', 1, 'this is a desc'),
    (2, 1,  'Calender', 1, 'this is a desc'),
    (3, 1,  'Quote Page', 1, 'this is a desc'),
    (4, 1,  'Habit Tracker', 1, 'this is a desc'),
    (5, 1,  'Mood Tracker', 1, 'this is a desc'),
    (6, 1,  'Vertical Weekly', 1, 'this is a desc'),
    (7, 1,  'Horizontal Weekly', 1, 'this is a desc');
SET IDENTITY_INSERT [Layout] OFF

SET IDENTITY_INSERT [TypeOfMedia] ON
  INSERT INTO [TypeOfMedia]
    ([Id], [type])
  VALUES
    (1, 'YouTube'),
    (2, 'IG'),
    (3, 'Blog'),
    (4, 'Reddit');
SET IDENTITY_INSERT [TypeOfMedia] Off

SET IDENTITY_INSERT [Resource] ON
  INSERT INTO [Resource] 
    ([Id], [UserProfileId], [TypeOfMediaId], [URL], [imageURL])
  VALUES
    (1, 1, 1,'thisIsAURL', 'thisIsAImageURL')
SET IDENTITY_INSERT [Resources] OFF

SET IDENTITY_INSERT [MonthlyLayout] ON
  INSERT INTO [MonthlyLayout]
    ([Id], [MonthlyId], [LayoutId], [InspiredBy], [ImageURL], [ResourceId], [Style])
  VALUES
    (1, 1, 1, 'blah', null, 1, 'style');
SET IDENTITY_INSERT [MonthlyLayout] OFF

SET IDENTITY_INSERT [HomepageResources] ON
    INSERT INTO [HomepageResources]
        ([Id] , [Topic], [URL])
    VALUES
       ( 1,	'Getting Started' ,	'https://sublimereflection.com/bullet-journal-101/'),
       (2,	'How to Bullet Journal' ,	'https://www.tinyrayofsunshine.com/blog/bullet-journal-guide'),
       (4,	'Printables for May',	'https://www.sheenaofthejournal.com/product/may-21-bullet-journal-printables/'),
       (5,	'Hand Lettering' ,	'https://www.pinterest.es/anna_orchid/bullet-journal/hand-lettering/'),
       (6,	'Habit Tracking', 'https://bulletjournal.com/blogs/bulletjournalist/intentional-habit-tracking'),
       (7,	'Stationary Ideas' ,	'https://littlecoffeefox.com/my-supplies/'),
       (8,	'Plinthced on IG' ,	'https://www.instagram.com/plinthced/'),
       (9,	'Bujo For Stars on  IG' ,	'https://www.instagram.com/bujoforstars/');
SET IDENTITY_INSERT [HomepageResources] OFF





